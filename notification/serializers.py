from rest_framework import serializers
from .models import Notification
from accounts.models import UserAccount


class NotificationSerializer(serializers.ModelSerializer):
    sender_name = serializers.ReadOnlyField(source='sender.name')
    profile_name = serializers.ReadOnlyField(source='sender.profile_name')
    sender_image = serializers.ImageField(source='sender.image')
    sender_id = serializers.IntegerField(source='sender.id')
    user_verified = serializers.BooleanField(source='sender.is_verified')

    class Meta:
        model = Notification
        fields = ('sender_name', 'profile_name', 'sender_image', 'user_verified',  'sender_id', 'date','seen', 'kind', 'post', 'reply')
