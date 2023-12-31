from django.db.models.signals import post_save
from django.dispatch import receiver

from cms.models import Community, UserCommunity


@receiver(post_save)
def add_creator_to_community(sender, **kwargs):
    if sender is Community:
        if kwargs["created"]:
            print("Community Created")
            instance = kwargs["instance"]
            UserCommunity.objects.create(
                user=instance.creator, community=instance.id, is_admin=True
            )
