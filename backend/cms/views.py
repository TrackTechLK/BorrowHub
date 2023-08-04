from django.contrib.auth.models import User, Group
from django.db.models import F
from rest_framework import viewsets
from rest_framework import permissions
from cms.serializers import UserSerializer, GroupSerializer, CategorySerializer, CommunitySerializer, CommunityRequestSerializer, UserCommunitySerializer
from cms.models import Category , Community, CommunityRequest, UserCommunity
from rest_framework import generics
from cms.serializers import UserSerializer, GroupSerializer, CategorySerializer
from cms.models import Category
from django.contrib.auth.models import User
from cms.serializers import RegisterSerializer



class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
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
