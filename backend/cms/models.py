from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import User
from datetime import date
from django.utils.translation import gettext as _

phone_regex = RegexValidator(
    regex=r'^\+?1?\d{9,12}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")

# Create your models here.


class Item(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    category = models.ForeignKey(
        'Category', related_name='items', on_delete=models.PROTECT)

    # TODO may be add unique together for name and category


class ItemUser(models.Model):
    id = models.AutoField(primary_key=True)
    item = models.ForeignKey(Item, on_delete=models.CASCADE, null=False)
    owner = models.ForeignKey(
        User, related_name='owner', on_delete=models.CASCADE, null=False)
    current_user = models.ForeignKey(
        User, related_name='current_user', on_delete=models.CASCADE, null=False, blank=True)

    class Meta:
        unique_together = ('item', 'owner')


class Borrow(models.Model):
    id = models.AutoField(primary_key=True)
    item_user = models.ForeignKey(
        ItemUser, on_delete=models.CASCADE, null=False)
    borrower = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    borrow_date = models.DateField(null=False)


class BorrowRequest(models.Model):
    id = models.AutoField(primary_key=True)
    item = models.ForeignKey(Item, on_delete=models.CASCADE, null=False)
    description = models.CharField(max_length=500)
    accepted = models.BooleanField(default=False)


class LendConfirmation(models.Model):
    borrow_request = models.ForeignKey(
        BorrowRequest, on_delete=models.CASCADE, null=False)
    lent = models.BooleanField(null=False)
    received = models.BooleanField(null=False)
    lent_date = models.DateField()
    received_date = models.DateField()


class ReturnConfirmation(models.Model):
    borrow = models.ForeignKey(Borrow, on_delete=models.CASCADE, null=False)
    returned = models.BooleanField(null=False)
    received = models.BooleanField(null=False)
    returned_date = models.DateTimeField(auto_now=True)
    received_date = models.DateTimeField(null=True, blank=True)


class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    parent = models.ForeignKey(
        'self',
        null=True,
        blank=True,
        on_delete=models.CASCADE,
    )


class Community(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="created_communities")
    created_date = models.DateField(_("Date"),  auto_now_add=True)
    category = models.ForeignKey(
        Category, null=True, blank=True, on_delete=models.CASCADE)
    users = models.ManyToManyField(
        User, through='UserCommunity', related_name='communities')

    # TODO may be add unique together for name and creator


class UserCommunity(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='user_communities')
    community = models.ForeignKey(
        Community, on_delete=models.CASCADE, related_name="user_communities")
    is_admin = models.BooleanField()

    class Meta:
        unique_together = ('user', 'community')


class CommunityRequest(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    community = models.ForeignKey(Community, on_delete=models.CASCADE)

    # TODO maybe add unique together to user and community
