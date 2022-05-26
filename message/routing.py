from django.urls import path
from .consumers import WSConsumers

ws_urlpatterns = [
    path('ws/some_url/<room>/<userid>/', WSConsumers.as_asgi())
]