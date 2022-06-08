from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import ResumeSerializer, LanguageSerializer, SkillSerializer, EducationDegreeSerializer, JobHistorySerializer
from .models import Language, Resume, Skill, JobHistory, EducationDegree
from accounts.models import UserAccount
from rest_framework.permissions import AllowAny, IsAuthenticated


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def resumeDetail(request, pk):
    user = get_object_or_404(UserAccount, id=pk)
    resume, created = Resume.objects.get_or_create(user=user)
    serializer = ResumeSerializer(resume, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def language(request):
    c = request.data.get('id')
    user = get_object_or_404(UserAccount ,id=request.data.get('user'))
    resume, created = Resume.objects.get_or_create(user=user)
    if (c):
        # delete
        lang = get_object_or_404(Language, id=request.data.get('id'))
        resume.languages.remove(lang)
        lang.delete()
        return Response({"id":request.data.get('id')})
    else:
        serializer = LanguageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            if (not c):
                lang = Language.objects.get(id=serializer.data["id"])
                resume.languages.add(lang)
            return Response(serializer.data)
        return Response(serializer.errors)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def skill(request):
    c = request.data.get('id')
    user = get_object_or_404(UserAccount ,id=request.data.get('user'))
    resume, created = Resume.objects.get_or_create(user=user)
    if (c):
        # delete
        skill = get_object_or_404(Skill, id=request.data.get('id'))
        resume.skills.remove(skill)
        skill.delete()
        return Response({"id":request.data.get('id')})
    else:
        serializer = SkillSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            if (not c):
                skill = Skill.objects.get(id=serializer.data["id"])
                resume.skills.add(skill)
            return Response(serializer.data)
        return Response(serializer.errors)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def job_history(request):
    c = request.data.get('id')
    user = get_object_or_404(UserAccount ,id=request.data.get('user'))
    resume, created = Resume.objects.get_or_create(user=user)
    if (c):
        # delete
        job = get_object_or_404(JobHistory, id=request.data.get('id'))
        resume.job_histories.remove(job)
        job.delete()
        return Response({"id":request.data.get('id')})
    else:
        serializer = JobHistorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            if (not c):
                job = JobHistory.objects.get(id=serializer.data["id"])
                resume.job_histories.add(job)
            return Response(serializer.data)
        return Response(serializer.errors)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def education(request):
    c = request.data.get('id')
    user = get_object_or_404(UserAccount ,id=request.data.get('user'))
    resume, created = Resume.objects.get_or_create(user=user)
    if (c):
        # delete
        edu = get_object_or_404(EducationDegree, id=request.data.get('id'))
        resume.educations.remove(edu)
        edu.delete()
        return Response({"id":request.data.get('id')})
    else:
        serializer = EducationDegreeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            if (not c):
                edu = EducationDegree.objects.get(id=serializer.data["id"])
                resume.educations.add(edu)
            return Response(serializer.data)
        return Response(serializer.errors)