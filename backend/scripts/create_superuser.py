from django.contrib.auth.models import User
from django.db import transaction


def run():
    user, _ = User.objects.get_or_create(
        username="admin", email="admin@sample.com"
    )
    user.is_superuser = True
    user.is_staff = True
    user.set_password("admin")
    user.save()
