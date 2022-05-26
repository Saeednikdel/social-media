from django.urls import path
from . import views

urlpatterns = [

    path('follow/', views.follow, name="follow"),
    path('avatar/', views.avatar, name="avatar"),

]
