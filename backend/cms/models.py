from ckeditor.fields import RichTextField
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import gettext as _

phone_regex = RegexValidator(
    regex=r"^\+?1?\d{9,12}$",
    message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.",
)


class TimeStampMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


# Create your models here.


class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    parent = models.ForeignKey(
        "self",
        null=True,
        blank=True,
        on_delete=models.CASCADE,
    )
    image_url = models.URLField(null=True, blank=True)


class ItemType(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=False)

    # TODO may be add unique together for name and category


class Item(TimeStampMixin):
    id = models.AutoField(primary_key=True)
    item_type = models.ForeignKey(ItemType, on_delete=models.CASCADE, null=False)
    owner = models.ForeignKey(
        User, related_name="owner", on_delete=models.CASCADE, null=False
    )
    current_user = models.ForeignKey(
        User, related_name="current_user", on_delete=models.CASCADE, null=True
    )

    class Meta:
        unique_together = ("item_type", "owner")


class Borrow(models.Model):
    id = models.AutoField(primary_key=True)
    item = models.ForeignKey(Item, on_delete=models.CASCADE, null=False)
    borrower = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    borrow_date = models.DateField(_("Date"), auto_now_add=True)
    state = models.CharField(
        choices=(
            ("PENDING_RETURN", "PENDING_RETURN"),
            ("BORROWED", "BORROWED"),
            ("RETURNED", "RETURNED"),
        ),
        max_length=50,
        default="BORROWED",
    )


class BorrowRequest(TimeStampMixin):
    id = models.AutoField(primary_key=True)
    item_type = models.ForeignKey(ItemType, on_delete=models.CASCADE, null=False)
    borrower = models.ForeignKey(
        User, on_delete=models.CASCADE, null=False, related_name="borrow_requests"
    )
    description = models.CharField(max_length=500)
    accepted = models.BooleanField(default=False)
    community = models.ForeignKey(
        "Community", on_delete=models.PROTECT, related_name="borrow_requests"
    )


class LendConfirmation(TimeStampMixin):
    borrow_request = models.ForeignKey(
        BorrowRequest, on_delete=models.CASCADE, null=False
    )
    lender = models.ForeignKey(
        User, related_name="lend_confirmations", on_delete=models.PROTECT
    )
    lent = models.BooleanField(null=False)
    received = models.BooleanField(null=False)
    lent_date = models.DateField(_("Date"), auto_now_add=True)
    received_date = models.DateField(null=True, blank=True)


class ReturnConfirmation(models.Model):
    borrow = models.ForeignKey(Borrow, on_delete=models.CASCADE, null=False)
    returned = models.BooleanField(null=False)
    received = models.BooleanField(null=False)
    returned_date = models.DateTimeField(auto_now_add=True)
    received_date = models.DateTimeField(null=True, blank=True)


class Community(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="created_communities"
    )
    created_date = models.DateField(_("Date"), auto_now_add=True)
    category = models.ForeignKey(
        Category, null=True, blank=True, on_delete=models.CASCADE
    )
    users = models.ManyToManyField(
        User, through="UserCommunity", related_name="communities"
    )
    description = RichTextField(null=True, blank=True)
    # TODO may be add unique together for name and creator

    # method for updating


@receiver(post_save, sender=Community, dispatch_uid="update_stock_count")
def update_stock(sender, instance, **kwargs):
    print("Community Created")
    UserCommunity.objects.create(
        user=instance.creator, community=instance, is_admin=True
    )


class UserCommunity(TimeStampMixin):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_communities"
    )
    community = models.ForeignKey(
        Community, on_delete=models.CASCADE, related_name="user_communities"
    )
    is_admin = models.BooleanField()

    class Meta:
        unique_together = ("user", "community")


class CommunityRequest(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    community = models.ForeignKey(Community, on_delete=models.CASCADE)
    status = models.CharField(
        choices=[
            ("PENDING", "PENDING"),
            ("ACCEPTED", "ACCEPTED"),
            ("DECLINED", "DECLINED"),
        ],
        max_length=50,
        default="PENDING",
    )

    # TODO maybe add unique together to user and community
