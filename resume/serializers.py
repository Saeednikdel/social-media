from rest_framework import serializers
from .models import Resume, Language, Skill, EducationDegree, JobHistory


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ('id', 'user', 'title', 'level')

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ('id', 'user', 'title', 'level')

class EducationDegreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationDegree
        fields = ('id', 'title', 'user', 'end_date', 'campus', 'score')
class JobHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = JobHistory
        fields = ('id', 'title', 'user', 'start_date', 'end_date', 'company')



class ResumeSerializer(serializers.ModelSerializer):
    language = LanguageSerializer(source="languages", read_only=True, many=True)
    skill = SkillSerializer(source="skills", read_only=True, many=True)
    job_history = JobHistorySerializer(source="job_histories", read_only=True, many=True)
    education = EducationDegreeSerializer(source="educations", read_only=True, many=True)
    name = serializers.CharField(source="user.name")
    phone_no = serializers.CharField(source="user.phone_no")
    profile_name = serializers.CharField(source="user.profile_name")
    military_service = serializers.CharField(source="user.military_service")
    address = serializers.CharField(source="user.address")
    bio = serializers.CharField(source="user.bio")
    birth_date = serializers.DateField(source="user.birth_date")
    image = serializers.ImageField(source="user.image")
    email = serializers.EmailField(source="user.email")
    show_resume = serializers.BooleanField(source="user.show_resume")
    class Meta:
        model = Resume
        fields = ('id', 'user', 'name', 'bio', 'show_resume', 'email', 'image', 'birth_date', 'phone_no', 'profile_name', 'military_service', 'address', 'language', 'skill', 'job_history', 'education')