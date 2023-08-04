from django.contrib.auth.models import User, Group
from django.contrib.auth.base_user import BaseUserManager
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import make_password
from django.db.models import F
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.utils import json
from rest_framework.response import Response
import base64
import requests
from rest_framework import permissions
from cms.serializers import *
from cms.models import *
from rest_framework import generics
from django.contrib.auth.models import User


from dotenv import load_dotenv
import os

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

class ItemUserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = ItemUser.objects.all()
    serializer_class = ItemUserSerializer
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

class LendConfirmationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = LendConfirmation.objects.all()
    serializer_class = LendConfirmationSerializer
    permission_classes = [permissions.IsAuthenticated]

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

        # TODO REFACTOR THIS SHIT. atm one could theoretically login using this random password. Is that a problem?
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

class CommunityRequestViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = CommunityRequest.objects.all()
    serializer_class = CommunityRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserCommunityViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = UserCommunity.objects.all()
    serializer_class = UserCommunitySerializer
    permission_classes = [permissions.IsAuthenticated]

# Used to register a user
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer
