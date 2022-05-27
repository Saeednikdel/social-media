from rest_framework import serializers
from .models import Notification
from accounts.models import UserAccount


class NotificationSerializer(serializers.ModelSerializer):
    sender_name = serializers.ReadOnlyField(source='sender.name')
    sender_image = serializers.ImageField(source='sender.image')
    sender_id = serializers.IntegerField(source='sender.id')
    class Meta:
        model = Notification
        fields = ('sender_name', 'sender_image', 'sender_id', 'date','seen', 'kind', 'post', 'reply')
