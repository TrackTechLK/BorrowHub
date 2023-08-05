# Generated by Django 4.1.6 on 2023-08-04 20:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('cms', '0005_alter_item_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='returnconfirmation',
            name='lent_date',
        ),
        migrations.AddField(
            model_name='returnconfirmation',
            name='returned_date',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='itemuser',
            name='current_user',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='current_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='returnconfirmation',
            name='received_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]