from django.contrib.auth.models import User, Group 
from rest_framework import serializers
from cms.models import *


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = "__all__"

class ItemUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemUser
        fields = "__all__"

class BorrowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Borrow
        fields = "__all__"

class BorrowRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BorrowRequest
        fields = "__all__"

class LendConfirmationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LendConfirmation
        fields = "__all__"

class ReturnConfirmationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReturnConfirmation
        fields = "__all__"

