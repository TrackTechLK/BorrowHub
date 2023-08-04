# Generated by Django 4.1.6 on 2023-08-04 20:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('cms', '0004_merge_20230804_1700'),
    ]

    operations = [
        migrations.CreateModel(
            name='ItemType',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('category', models.CharField(max_length=100)),
            ],
        ),
        migrations.RemoveField(
            model_name='borrow',
            name='item_user',
        ),
        migrations.RemoveField(
            model_name='borrowrequest',
            name='item',
        ),
        migrations.RemoveField(
            model_name='item',
            name='category',
        ),
        migrations.RemoveField(
            model_name='item',
            name='name',
        ),
        migrations.AddField(
            model_name='borrow',
            name='item',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='cms.item'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='item',
            name='current_user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='current_user', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='item',
            name='owner',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='owner', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='ItemUser',
        ),
        migrations.AddField(
            model_name='borrowrequest',
            name='item_type',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='cms.itemtype'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='item',
            name='item_type',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='cms.itemtype'),
            preserve_default=False,
        ),
    ]
