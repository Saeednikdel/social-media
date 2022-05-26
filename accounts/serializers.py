from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
from accounts.models import UserAccount

User = get_user_model()


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('id', 'email', 'name', 'password', 'is_active')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('id', 'name','image',)


class UserDetailSerializer(serializers.ModelSerializer):
    # follower_list = UserSerializer(source="follower", read_only=True, many=True)
    followers = serializers.IntegerField(source='follower_count')
    followings = serializers.IntegerField(source='following_count')

    class Meta:
        model = UserAccount
        fields = ('id', 'followers', 'followings', 'email', 'name', 'image', 'phone_no', 'birth_date', 'join_date', 'is_entity', 'is_staff', 'bio')

class UserDetailSerializer2(serializers.ModelSerializer):
    followers = serializers.IntegerField(source='follower_count')
    followings = serializers.IntegerField(source='following_count')

    class Meta:
        model = UserAccount
        fields = ('id', 'followers', 'followings', 'email', 'name', 'image', 'join_date', 'is_entity', 'bio')