from django.urls import path
from . import views

urlpatterns = [
    path('<str:pk>/<str:sk>/', views.notification, name="notification"),
]