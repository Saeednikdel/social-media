import math

from django.core.paginator import Paginator
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import ResumeSerializer, LanguageSerializer, SkillSerializer, EducationDegreeSerializer, JobHistorySerializer
from itertools import chain
from .models import Language, Resume, Skill, JobHistory, EducationDegree
from collections import namedtuple
from accounts.models import UserAccount
from rest_framework.permissions import AllowAny, IsAuthenticated
from djoser.compat import get_user_email
from djoser.conf import settings


@api_view(['GET'])
@permission_classes([AllowAny])
def resumeDetail(request, pk):
    resume = get_object_or_404(Resume, user=pk)
    serializer = ResumeSerializer(resume, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def language(request):
    c = request.data.get('id')
    if (c):
        user = UserAccount.objects.get(id=request.data.get('user'))
        lang_instance, created = Language.objects.get_or_create(user=user, id=request.data.get('id'))
        serializer = LanguageSerializer(instance=lang_instance, data=request.data)
    else:
        serializer = LanguageSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        if (not c):
            user = UserAccount.objects.get(id=request.data.get('user'))
            resume, created = Resume.objects.get_or_create(user=user)
            lang = Language.objects.get(id=serializer.data["id"])
            resume.languages.add(lang)
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['POST'])
@permission_classes([AllowAny])
def skill(request):
    c = request.data.get('id')
    if (c):
        user = UserAccount.objects.get(id=request.data.get('user'))
        skill_instance, created = Skill.objects.get_or_create(user=user, id=request.data.get('id'))
        serializer = SkillSerializer(instance=skill_instance, data=request.data)
    else:
        serializer = SkillSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        if (not c):
            user = UserAccount.objects.get(id=request.data.get('user'))
            resume, created = Resume.objects.get_or_create(user=user)
            skill = Skill.objects.get(id=serializer.data["id"])
            resume.skills.add(skill)
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['POST'])
@permission_classes([AllowAny])
def job_history(request):
    c = request.data.get('id')
    if (c):
        user = UserAccount.objects.get(id=request.data.get('user'))
        job_instance, created = JobHistory.objects.get_or_create(user=user, id=request.data.get('id'))
        serializer = JobHistorySerializer(instance=job_instance, data=request.data)
    else:
        serializer = JobHistorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        if (not c):
            user = UserAccount.objects.get(id=request.data.get('user'))
            resume, created = Resume.objects.get_or_create(user=user)
            job = JobHistory.objects.get(id=serializer.data["id"])
            resume.job_histories.add(job)
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['POST'])
@permission_classes([AllowAny])
def education(request):
    c = request.data.get('id')
    if (c):
        user = UserAccount.objects.get(id=request.data.get('user'))
        edu_instance, created = EducationDegree.objects.get_or_create(user=user, id=request.data.get('id'))
        serializer = EducationDegreeSerializer(instance=edu_instance, data=request.data)
    else:
        serializer = EducationDegreeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        if (not c):
            user = UserAccount.objects.get(id=request.data.get('user'))
            resume, created = Resume.objects.get_or_create(user=user)
            edu = EducationDegree.objects.get(id=serializer.data["id"])
            resume.educations.add(edu)
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['POST'])
@permission_classes([AllowAny])
def resume(request):
    user = UserAccount.objects.get(id=request.data.get('user'))
    resume, created = Resume.objects.get_or_create(user=user)
    serializer = ResumeSerializer(instance=resume, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)