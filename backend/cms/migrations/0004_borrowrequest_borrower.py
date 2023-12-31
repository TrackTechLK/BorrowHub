# Generated by Django 4.1.6 on 2023-08-05 15:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('cms', '0003_lendconfirmation_lender'),
    ]

    operations = [
        migrations.AddField(
            model_name='borrowrequest',
            name='borrower',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='borrow_requests', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
