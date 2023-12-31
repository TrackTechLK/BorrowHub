# Generated by Django 4.1.6 on 2023-08-08 14:00

import ckeditor.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0005_alter_borrow_borrow_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='image_url',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='community',
            name='description',
            field=ckeditor.fields.RichTextField(blank=True, null=True),
        ),
    ]
