import base64
import os
from datetime import datetime

import requests
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import Group, User
from django.db.models import BooleanField, Case, Count, Q, Value, When
from django_filters.rest_framework import DjangoFilterBackend
from dotenv import load_dotenv
from rest_framework import filters, generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.utils import json
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

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
from cms.serializers import (
    BorrowRequestSerializer,
    BorrowSerializer,
    CategorySerializer,
    CommunityRequestSerializer,
    CommunitySerializer,
    EventSerializer,
    GroupSerializer,
    ItemSerializer,
    ItemTypeSerializer,
    LendConfirmationSerializer,
    RegisterSerializer,
    ReturnConfirmationSerializer,
    UserCommunitySerializer,
    UserSerializer,
)

load_dotenv()


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]


class ItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        request.data["owner"] = request.user.id
        return super().create(request, *args, **kwargs)


class ItemTypeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = ItemType.objects.all()
    serializer_class = ItemTypeSerializer
    permission_classes = [permissions.IsAuthenticated]


class BorrowViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Borrow.objects.all()
    serializer_class = BorrowSerializer
    permission_classes = [permissions.IsAuthenticated]


class BorrowRequestViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = BorrowRequest.objects.all()
    serializer_class = BorrowRequestSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ["community"]

    def create(self, request, *args, **kwargs):
        request.data["borrower"] = request.user.id
        return super().create(request, *args, **kwargs)


class LendConfirmationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = LendConfirmation.objects.all()
    serializer_class = LendConfirmationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        request.data["lender"] = request.user.id

        # A user accepts a borrow request means that he has that item. therefore we add it to his
        # inventory
        borrow_request = BorrowRequest.objects.get(pk=request.data["borrow_request"])
        Item.objects.get_or_create(
            item_type=borrow_request.item_type, owner=request.user
        )

        return super().create(request, *args, **kwargs)


class ReturnConfirmationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = ReturnConfirmation.objects.all()
    serializer_class = ReturnConfirmationSerializer
    permission_classes = [permissions.IsAuthenticated]


class GoogleView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        payload = {
            "code": request.data.get("code"),
            "code_verifier": request.data.get("code_verifier"),
            "client_id": os.getenv("OIDC_CLIENT_ID"),
            "client_secret": os.getenv("OIDC_CLIENT_SECRET"),
            "redirect_uri": os.getenv("OIDC_REDIRECT_URI"),
            "grant_type": "authorization_code",
        }  # validate the token
        r = requests.post(" https://oauth2.googleapis.com/token", data=payload)
        data = json.loads(r.text)
        id_token = data["id_token"]
        if not id_token:
            content = {
                "message": "wrong google token / this google token is already expired."
            }
            return Response(content).status_code(400)

        # get user info
        # split by . and get the second part, which is the payload, then decode it base64
        user_info = json.loads(
            str(base64.b64decode(id_token.split(".")[1] + "==="), "utf-8")
        )

        # TODO REFACTOR THIS SHIT. atm one could theoretically login using this random password.
        # Is that a problem?
        # Does a more elegant way exist?
        # create user if not exist
        try:
            user = User.objects.get(email=user_info["email"])
        except User.DoesNotExist:
            user = User()
            user.username = user_info["email"]
            # provider random default password
            user.password = make_password(BaseUserManager().make_random_password())
            user.email = user_info["email"]
            user.save()

        token = RefreshToken.for_user(
            user
        )  # generate token without username & password
        response = {}
        response["username"] = user.username
        response["access"] = str(token.access_token)
        response["refresh"] = str(token)
        return Response(response)


class CommunityViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Community.objects.all()
    serializer_class = CommunitySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ["name"]
    filterset_fields = ["users"]

    def create(self, request, *args, **kwargs):
        request.data["creator"] = request.user.id
        return super().create(request, *args, **kwargs)

    def get_queryset(self):
        # print(Community.objects.exclude(users__id__contains=self.request.user.id).annotate(
        #     not_joined=Value(True, output_field=models.BooleanField()))
        # # noqa: W505 return Community.objects.annotate(not_joined=Value(True, output_field=models.BooleanField()))
        return Community.objects.annotate(
            temp_num=Count("users", filter=Q(users__id__contains=self.request.user.id))
        ).annotate(
            is_joined=Case(
                When(temp_num__gt=0, then=Value(True)),
                default=Value(False),
                outputField=BooleanField(),
            )
        )


class MyCommunityViewSet(viewsets.ModelViewSet):
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ["name"]
    filterset_fields = ["name"]

    def get_queryset(self):
        return (
            Community.objects.filter(users__id__contains=self.request.user.id)
            .annotate(
                temp_num=Count(
                    "users", filter=Q(users__id__contains=self.request.user.id)
                )
            )
            .annotate(
                is_joined=Case(
                    When(temp_num__gt=0, then=Value(True)),
                    default=Value(False),
                    outputField=BooleanField(),
                )
            )
        )


class CommunityRequestViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = CommunityRequest.objects.all()
    serializer_class = CommunityRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        request.data["user"] = request.user.id

        return super().create(request, *args, **kwargs)


class UserCommunityViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = UserCommunity.objects.all()
    serializer_class = UserCommunitySerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ["community", "is_admin"]

    def create(self, request, *args, **kwargs):
        com_req_id = request.data["community_request_id"]
        community_request = CommunityRequest.objects.get(pk=com_req_id)
        community_request.status = "ACCEPTED"
        community_request.save()

        return super().create(request, *args, **kwargs)


# Used to register a user
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Customize your success response here
            res_data = {
                "id": user.pk,
                "username": user.username,
                "email": user.email,
            }
            return Response(
                res_data,
                status=status.HTTP_201_CREATED,
            )
        else:
            # Customize your error response here
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Task(object):
    def __init__(self, **kwargs):
        for field in ("id", "type", "time", "user"):
            setattr(self, field, kwargs.get(field, None))


class EventViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = EventSerializer

    def list(self, request):
        tasks = [
            Task(id=1, type="Demo", time=datetime.now(), user=1),
            Task(id=2, type="Model less demo", time=datetime.now(), user=1),
            Task(id=3, type="Sleep more", time=datetime.now(), user=1),
        ]

        serializer = EventSerializer(instance=tasks, many=True)
        return Response(
            {
                "count": len(serializer.data),
                "next": None,
                "previous": None,
                "results": serializer.data,
            }
        )


class LendsViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ["owner", "current_user"]
    filterset_fields = ["owner", "current_user"]

    def get_queryset(self):
        return Item.objects.filter(owner=self.request.user.id).filter(
            current_user__isnull=False
        )
