from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import User

phone_regex = RegexValidator(
    regex=r'^\+?1?\d{9,12}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")

# Create your models here.

class Item(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)

class ItemUser(models.Model):
    id = models.AutoField(primary_key=True)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE, null=False)
    owner = models.ForeignKey(User,related_name='owner',on_delete=models.CASCADE, null=False)
    current_user = models.ForeignKey(User,related_name='current_user',on_delete=models.CASCADE,null=False)

class Borrow(models.Model):
    id = models.AutoField(primary_key=True)
    item_user_id = models.ForeignKey(ItemUser,on_delete=models.CASCADE, null=False)
    borrower = models.ForeignKey(User,on_delete=models.CASCADE,null=False)
    borrow_date = models.DateField(null=False)

class BorrowRequest(models.Model):
    id = models.AutoField(primary_key=True)
    item_id = models.ForeignKey(Item,on_delete=models.CASCADE, null=False)
    description = models.CharField(max_length=500)
    accepted = models.BooleanField(default=False)

class LendConfirmation(models.Model):
    BorrowRequest_id = models.ForeignKey(BorrowRequest,on_delete=models.CASCADE, null=False)
    lent = models.BooleanField(null=False)
    received = models.BooleanField(null=False)
    lent_date = models.DateField()
    received_date = models.DateField()

class ReturnConfirmation(models.Model):
    Borrow_id = models.ForeignKey(Borrow,on_delete=models.CASCADE, null=False)
    returned = models.BooleanField(null=False)
    received = models.BooleanField(null=False)
    lent_date = models.DateField()
    received_date = models.DateField()


class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    parent = models.ForeignKey(
        'self',
        null=True,
        blank=True,
        on_delete=models.CASCADE,
    )