"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from cms import views
from cms.views import RegisterView

router = routers.DefaultRouter()
router.register(r"users", views.UserViewSet)
router.register(r"groups", views.GroupViewSet)
router.register(r"categories", views.CategoryViewSet)
router.register(r"items", views.ItemViewSet)
router.register(r"item_types", views.ItemTypeViewSet)
router.register(r"borrows", views.BorrowViewSet)
router.register(r"borrow_requests", views.BorrowRequestViewSet)
router.register(r"lend_confirmations", views.LendConfirmationViewSet)
router.register(r"return_confirmations", views.ReturnConfirmationViewSet)
router.register(r"communities", views.CommunityViewSet)
router.register(r"community_requests", views.CommunityRequestViewSet)
router.register(r"user_communities", views.UserCommunityViewSet)
router.register(r"my_communities", views.MyCommunityViewSet)
router.register(r"lends", views.LendsViewSet)
router.register(r"events", views.EventViewSet, basename="events")

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path("api/", include(router.urls)),
    path("api/admin/", admin.site.urls),
    path("api/rest-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/register/", RegisterView.as_view(), name="auth_register"),
    path("api/google/", views.GoogleView.as_view(), name="google"),
]
