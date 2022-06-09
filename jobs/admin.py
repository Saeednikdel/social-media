from django.contrib import admin
from .models import Job, JobLike,JobBookmark,JobReply


admin.site.register(Job)
admin.site.register(JobLike)
admin.site.register(JobBookmark)
admin.site.register(JobReply)