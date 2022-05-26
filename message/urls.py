from django.urls import path
from . import views

urlpatterns = [
    path('room/<str:pk>/', views.roomMsg, name="room"),
    path('room-list/<str:pk>/', views.roomList, name="room-list"),
    path('getroom/<str:user1>/<str:user2>/', views.getRoom, name="room-create"),
]