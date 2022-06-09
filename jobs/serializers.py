from rest_framework import serializers
from .models import Job, JobReply, JobBookmark
from accounts.models import UserAccount


class ReplySerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.name')
    profile_name = serializers.ReadOnlyField(source='user.profile_name')
    class Meta:
        model = JobReply
        fields = ('id', 'job' ,'user', 'user_name', 'text', 'date', 'profile_name')

class BookmarkSerializer(serializers.ModelSerializer):
    job_content = serializers.ReadOnlyField(source='job.short_content')
    user_image = serializers.ImageField(source='job.user.image')
    job_view = serializers.IntegerField(source='job.view')
    job_id = serializers.IntegerField(source='job.id')
    user_name = serializers.CharField(source='job.user.name')
    profile_name = serializers.CharField(source='job.user.profile_name')
    job_user_id = serializers.IntegerField(source='job.user.id')
    image = serializers.ImageField(source='job.image')
    job_date = serializers.ReadOnlyField(source='job.date')
    user_verified = serializers.BooleanField(source='job.user.is_verified')

    class Meta:
        model = JobBookmark
        fields = ('id','job_id', 'profile_name', 'job_user_id', 'user_verified', 'user_image','job_date','user_name','image', 'job_content', 'job_view')

class JobSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.name')
    profile_name = serializers.ReadOnlyField(source='user.profile_name')
    user_image = serializers.ImageField(source='user.image')
    user_verified = serializers.BooleanField(source='user.is_verified')
    class Meta:
        model = Job
        fields = ('id', 'user', 'profile_name', 'user_name', 'user_verified', 'user_image', 'date', 'view', 'content', 'image')

class NewJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('id', 'user', 'content')

class JobsSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.name')
    user_image = serializers.ImageField(source='user.image')
    user_verified = serializers.BooleanField(source='user.is_verified')
    text = serializers.ReadOnlyField(source='short_content')
    profile_name = serializers.ReadOnlyField(source='user.profile_name')

    class Meta:
        model = Job
        fields = ('id', 'user', 'profile_name', 'user_name', 'user_verified', 'user_image', 'date', 'view', 'image', 'text')