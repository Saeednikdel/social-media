from django.urls import path
from . import views

urlpatterns = [
    path('job-list/<str:pk>/', views.jobList, name="job-list"),
    path('user-job-list/<str:name>/<str:page>/', views.userJobList, name="user-job-list"),
    path('job-detail/<str:pk>/', views.JobDetail, name="job-detail"),
    path('job-create/', views.JobCreate, name="job-create"),

    path('bookmark/', views.bookmark, name="bookmark"),
    path('bookmark-list/<str:user_id>/<str:page>/', views.bookmarkList, name="bookmark-list"),

    path('reply/', views.reply, name="reply"),
    path('reply-list/<str:pk>/', views.replyList, name="reply-list"),

    path('request/', views.request, name="request"),

    ]
