from rest_framework import serializers
from .models import Post, Reply, Like, Bookmark
from accounts.models import UserAccount

class LikeSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.name')
    user_image = serializers.ImageField(source='user.image')
    class Meta:
        model = Like
        fields = ('user', 'user_name', 'user_image')

class ReplySerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.name')
    class Meta:
        model = Reply
        fields = ('id', 'post' ,'user', 'user_name', 'text', 'date')

class BookmarkSerializer(serializers.ModelSerializer):
    post_content = serializers.ReadOnlyField(source='post.short_content')
    user_image = serializers.ImageField(source='post.user.image')
    post_like = serializers.IntegerField(source='post.like_count')
    post_view = serializers.IntegerField(source='post.view')
    post_id = serializers.IntegerField(source='post.id')
    user_name = serializers.CharField(source='post.user.name')
    post_user_id = serializers.IntegerField(source='post.user.id')
    image = serializers.ImageField(source='post.image')
    post_date = serializers.ReadOnlyField(source='post.date')
    class Meta:
        model = Bookmark
        fields = ('id','post_id','post_user_id','user_image','post_date','user_name','image', 'post_content', 'post_like', 'post_view')

class PostSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.name')
    user_image = serializers.ImageField(source='user.image')
    class Meta:
        model = Post
        fields = ('id', 'user', 'user_name', 'user_image', 'like_count', 'date', 'view', 'content', 'image')

class NewPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'user', 'content')

class PostsSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.name')
    user_image = serializers.ImageField(source='user.image')
    text = serializers.ReadOnlyField(source='short_content')
    class Meta:
        model = Post
        fields = ('id', 'user', 'user_name', 'user_image', 'like_count', 'date', 'view', 'image', 'text')


class UserDetailSerializer(serializers.ModelSerializer):
    followers = serializers.IntegerField(source='follower_count')
    followings = serializers.IntegerField(source='following_count')

    class Meta:
        model = UserAccount
        fields = ('id', 'followers', 'followings', 'email', 'name', 'image', 'join_date', 'is_entity', 'bio')