from django.urls import path
from . import views

urlpatterns = [
    path('room/<str:room>/<str:page>/', views.roomMsg, name="room"),
    path('room-list/<str:user>/<str:page>/', views.roomList, name="room-list"),
    path('getroom/<str:user1>/<str:user2>/', views.getRoom, name="room-create"),
]