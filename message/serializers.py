from rest_framework import serializers
from .models import Message, Room
from accounts.models import UserAccount


class MessageSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.name')
    user_image = serializers.ImageField(source='user.image')
    class Meta:
        model = Message
        fields = ('user', 'user_name', 'user_image', 'content', 'date', 'seen', 'room')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('id', 'name', 'image', 'is_verified')


class RoomSerializer(serializers.ModelSerializer):
    users_list = UserSerializer(source="users", read_only=True, many=True)
    online_list = UserSerializer(source="online_users", read_only=True, many=True)
    class Meta:
        model = Room
        fields = ('id', 'is_active', 'users_list', 'online_list')