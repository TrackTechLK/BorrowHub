from django.contrib import admin
from cms.models import Community
from django.contrib.admin.models import LogEntry, ADDITION, CHANGE

# Register your models here.
admin.site.register(Community)
admin.site.register(LogEntry)
