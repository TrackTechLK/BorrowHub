from django.contrib.auth.models import Group, User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from cms.models import (
    Borrow,
    BorrowRequest,
    Category,
    Community,
    CommunityRequest,
    Item,
    ItemType,
    LendConfirmation,
    ReturnConfirmation,
    UserCommunity,
)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "url", "username", "email", "groups", "communities"]


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "name"]


class CategorySerializer(serializers.ModelSerializer):
    parent_name = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = "__all__"

    def get_parent_name(self, obj):
        if obj.parent:
            return obj.parent.name
        else:
            return None


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = "__all__"


class ItemTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemType
        fields = "__all__"


class BorrowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Borrow
        fields = "__all__"


class BorrowRequestSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    item_type_name = serializers.SerializerMethodField()

    class Meta:
        model = BorrowRequest
        fields = "__all__"

    def get_username(self, obj):
        return obj.borrower.username

    def get_item_type_name(self, obj):
        return obj.item_type.name


class LendConfirmationSerializer(serializers.ModelSerializer):
    item = serializers.SerializerMethodField()
    borrower = serializers.SerializerMethodField()
    item_name = serializers.SerializerMethodField()

    class Meta:
        model = LendConfirmation
        fields = "__all__"

    def get_item(self, obj):
        return (
            Item.objects.filter(
                owner=obj.lender, item_type=obj.borrow_request.item_type
            )
            .first()
            .id
        )

    def get_item_name(self, obj):
        return obj.borrow_request.item_type.name

    def get_borrower(self, obj):
        return obj.borrow_request.borrower.id


class ReturnConfirmationSerializer(serializers.ModelSerializer):
    item = serializers.SerializerMethodField()

    class Meta:
        model = ReturnConfirmation
        fields = "__all__"

    def get_item(self, obj):
        return obj.borrow.item.id


class CommunitySerializer(serializers.ModelSerializer):
    creator_username = serializers.SerializerMethodField()
    category_name = serializers.SerializerMethodField()
    is_joined = serializers.SerializerMethodField()

    class Meta:
        model = Community
        fields = "__all__"

    def get_creator_username(self, obj):
        return obj.creator.username

    def get_category_name(self, obj):
        try:
            return obj.category.name
        except AttributeError:
            return None

    def get_is_joined(self, obj):
        try:
            return obj.is_joined
        except AttributeError:
            return False


class CommunityRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityRequest
        fields = "__all__"


class UserCommunitySerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    class Meta:
        model = UserCommunity
        fields = "__all__"

    def get_username(self, obj):
        return obj.user.username


# Used to register a user


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = (
            "username",
            "password",
            "password2",
            "email",
            "first_name",
            "last_name",
        )
        extra_kwargs = {
            "first_name": {"required": True},
            "last_name": {"required": True},
        }

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data["username"],
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )

        user.set_password(validated_data["password"])
        user.save()
        return user


class EventSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    type = serializers.CharField(max_length=256)
    time = serializers.DateTimeField()
    user = serializers.IntegerField()
