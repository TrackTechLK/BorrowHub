from django.contrib import admin
from django.contrib.admin.models import LogEntry

from cms.models import Community

# Register your models here.
admin.site.register(Community)
admin.site.register(LogEntry)
