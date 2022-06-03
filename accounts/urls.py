from django.urls import path
from . import views

urlpatterns = [

    path('follow/', views.follow, name="follow"),
    path('avatar/', views.avatar, name="avatar"),
    path('header/', views.header, name="header"),
    path('user-set/', views.userSet, name="user-set"),
]
