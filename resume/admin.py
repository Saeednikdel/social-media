from django.contrib import admin
from .models import Resume, EducationDegree, JobHistory, Skill,Language

admin.site.register(Resume)
admin.site.register(EducationDegree)
admin.site.register(JobHistory)
admin.site.register(Skill)
admin.site.register(Language)

