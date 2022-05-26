from django.urls import path
from . import views

urlpatterns = [
    path('resume/<str:pk>/', views.resumeDetail, name="resume_detail"),
    path('resume/', views.resume, name="resume"),
    path('language/', views.language, name="language"),
    path('skill/', views.skill, name="skill"),
    path('job_history/', views.job_history, name="job_history"),
    path('education/', views.education, name="education"),
]