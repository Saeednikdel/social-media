from rest_framework import serializers
from .models import Post, Reply, Like, Bookmark
from accounts.models import UserAccount

class LikeSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.name')
    user_image = serializers.ImageField(source='user.image')
    profile_name = serializers.CharField(source='user.profile_name')
    class Meta:
        model = Like
        fields = ('user', 'user_name', 'user_image', 'profile_name')

class FollowerSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField(source='id')
    user_name = serializers.CharField(source='name')
    user_image = serializers.ImageField(source='image')
    profile_name = serializers.CharField(source='profile_name')
    class Meta:
        model = UserAccount
        fields = ('user', 'user_name', 'user_image', 'profile_name')


class ReplySerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.name')
    profile_name = serializers.ReadOnlyField(source='user.profile_name')
    class Meta:
        model = Reply
        fields = ('id', 'post' ,'user', 'user_name', 'text', 'date', 'profile_name')

class BookmarkSerializer(serializers.ModelSerializer):
    post_content = serializers.ReadOnlyField(source='post.short_content')
    user_image = serializers.ImageField(source='post.user.image')
    post_like = serializers.IntegerField(source='post.like_count')
    post_view = serializers.IntegerField(source='post.view')
    post_id = serializers.IntegerField(source='post.id')
    user_name = serializers.CharField(source='post.user.name')
    profile_name = serializers.CharField(source='post.user.profile_name')
    post_user_id = serializers.IntegerField(source='post.user.id')
    image = serializers.ImageField(source='post.image')
    post_date = serializers.ReadOnlyField(source='post.date')
    user_verified = serializers.BooleanField(source='post.user.is_verified')

    class Meta:
        model = Bookmark
        fields = ('id','post_id', 'profile_name', 'post_user_id', 'user_verified', 'user_image','post_date','user_name','image', 'post_content', 'post_like', 'post_view')

class PostSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.name')
    profile_name = serializers.ReadOnlyField(source='user.profile_name')
    user_image = serializers.ImageField(source='user.image')
    user_verified = serializers.BooleanField(source='user.is_verified')
    class Meta:
        model = Post
        fields = ('id', 'user', 'profile_name', 'user_name', 'user_verified', 'user_image', 'like_count', 'date', 'view', 'content', 'image')

class NewPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'user', 'content')

class PostsSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.name')
    user_image = serializers.ImageField(source='user.image')
    user_verified = serializers.BooleanField(source='user.is_verified')
    text = serializers.ReadOnlyField(source='short_content')
    profile_name = serializers.ReadOnlyField(source='user.profile_name')

    class Meta:
        model = Post
        fields = ('id', 'user', 'profile_name', 'user_name', 'user_verified', 'user_image', 'like_count', 'date', 'view', 'image', 'text')


class UserDetailSerializer(serializers.ModelSerializer):
    followers = serializers.IntegerField(source='follower_count')
    followings = serializers.IntegerField(source='following_count')

    class Meta:
        model = UserAccount
        fields = ('id', 'profile_name', 'followers', 'header', 'is_verified', 'followings', 'email', 'name', 'image', 'join_date', 'is_entity', 'bio')