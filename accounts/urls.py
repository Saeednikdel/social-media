from django.urls import path
from . import views

urlpatterns = [

    path('follow/', views.follow, name="follow"),
    path('avatar/', views.avatar, name="avatar"),
    path('header/', views.header, name="header"),
    path('followerlist/<str:id>/', views.followerList, name="followerlist"),
    path('followinglist/<str:id>/', views.followingList, name="followinglist"),
    path('user-set/', views.userSet, name="user-set"),

]
