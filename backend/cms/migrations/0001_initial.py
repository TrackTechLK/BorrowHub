# Generated by Django 4.1.6 on 2023-08-05 13:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Borrow',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('borrow_date', models.DateField()),
                ('borrower', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='BorrowRequest',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('description', models.CharField(max_length=500)),
                ('accepted', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='cms.category')),
            ],
        ),
        migrations.CreateModel(
            name='Community',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('created_date', models.DateField(auto_now_add=True, verbose_name='Date')),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='cms.category')),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_communities', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserCommunity',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('is_admin', models.BooleanField()),
                ('community', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_communities', to='cms.community')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_communities', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'community')},
            },
        ),
        migrations.CreateModel(
            name='ReturnConfirmation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('returned', models.BooleanField()),
                ('received', models.BooleanField()),
                ('returned_date', models.DateTimeField(auto_now=True)),
                ('received_date', models.DateTimeField(blank=True, null=True)),
                ('borrow', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cms.borrow')),
            ],
        ),
        migrations.CreateModel(
            name='LendConfirmation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lent', models.BooleanField()),
                ('received', models.BooleanField()),
                ('lent_date', models.DateField()),
                ('received_date', models.DateField()),
                ('borrow_request', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cms.borrowrequest')),
            ],
        ),
        migrations.CreateModel(
            name='ItemType',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cms.category')),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('current_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='current_user', to=settings.AUTH_USER_MODEL)),
                ('item_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cms.itemtype')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owner', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('item_type', 'owner')},
            },
        ),
        migrations.CreateModel(
            name='CommunityRequest',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('community', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cms.community')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='community',
            name='users',
            field=models.ManyToManyField(related_name='communities', through='cms.UserCommunity', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='borrowrequest',
            name='item_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cms.itemtype'),
        ),
        migrations.AddField(
            model_name='borrow',
            name='item',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cms.item'),
        ),
    ]