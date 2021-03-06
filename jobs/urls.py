from django.urls import path
from . import views

urlpatterns = [
    path('job-list/<str:pk>/', views.jobList, name="job-list"),
    path('user-job-list/<str:name>/<str:page>/', views.userJobList, name="user-job-list"),
    path('job-detail/<str:pk>/', views.JobDetail, name="job-detail"),
    path('job-create/', views.jobCreate, name="job-create"),
    path('job-remove/', views.jobRemove, name="job-remove"),

    path('send-resume/', views.sendResume, name="send-resume"),
    path('see-resume/', views.seeResume, name="see-resume"),
    path('job-request-list/<str:id>/<str:page>/', views.jobRequestList, name="job-request-list"),

    path('bookmark/', views.bookmark, name="bookmark"),
    path('bookmark-list/<str:user_id>/<str:page>/', views.bookmarkList, name="bookmark-list"),

    path('reply/', views.reply, name="reply"),
    path('reply-list/<str:pk>/', views.replyList, name="reply-list"),

    path('request/', views.request, name="request"),

    ]
