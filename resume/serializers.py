from rest_framework import serializers
from .models import Resume, Language, Skill, EducationDegree, JobHistory


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ('id', 'user', 'title', 'level', 'lang_skills', 'end_date', 'certificate')

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ('id', 'user', 'title', 'level', 'end_date', 'certificate')

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
    class Meta:
        model = Resume
        fields = ('id', 'user', 'militry_service', 'address', 'language', 'skill', 'job_history', 'education')