from django.contrib import admin
from .models import Job,JobBookmark,JobReply


admin.site.register(Job)
admin.site.register(JobBookmark)
admin.site.register(JobReply)