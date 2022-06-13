from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from accounts.models import UserAccount
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Job, JobBookmark, JobReply
from .serializers import BookmarkSerializer,UserRequestSerializer, JobSerializer,NewJobSerializer ,ReplySerializer, JobsSerializer
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator
from django.shortcuts import get_object_or_404
from notification.models import Notification
from resume.models import Resume
from resume.serializers import ResumeSerializer
from rest_framework import status

@api_view(['POST'])
@permission_classes([AllowAny])
def sendResume(request):
    job = get_object_or_404(Job, id=request.data.get('id'))
    user = get_object_or_404(UserAccount, id=request.data.get('user'))
    if user in job.job_requests.all():
        return Response({"message":"allready sent"})
    else:
        job.job_requests.add(user)
        return Response({"message":"resume sent"})


@api_view(['POST'])
@permission_classes([AllowAny])
def seeResume(request):
    user = get_object_or_404(UserAccount, id=request.data.get('user'))
    requested_user = get_object_or_404(UserAccount, id=request.data.get('requested_user'))
    job = get_object_or_404(Job, id=request.data.get('id'), user=user)
    if requested_user in job.job_requests.all():
        resume = get_object_or_404(Resume ,user=requested_user)
        serializer = ResumeSerializer(resume, many=False)
        return Response(serializer.data)
    else:
        return Response({"detail":"this user is not requested"} ,status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def jobRequestList(request, id, page):
    job = get_object_or_404(Job ,id=id)
    req = job.job_requests.all()
    itemperpage = 10
    paginator = Paginator(req, itemperpage)
    count = len(req)
    req = paginator.get_page(page)
    serializer = UserRequestSerializer(req, many=True)
    new_dict = {"count": count}
    new_dict.update({"job_requests": serializer.data})
    return Response(new_dict)


@api_view(['POST'])
@permission_classes([AllowAny])
def jobList(request, pk):
    if request.data.get('keyword'):
        keyword = request.data.get('keyword')
        jobs = Job.objects.filter(content__contains=keyword).order_by('-date')
    elif request.data.get('user'):
        user = UserAccount.objects.get(id=request.data.get('user'))
        jobs =Job.objects.filter(user__in=user.following.all()).order_by('-date')
        if jobs.count() == 0:
            jobs = Job.objects.all().order_by('-date')
    else:
        jobs = Job.objects.all().order_by('-date')
    itemperpage = 10
    paginator = Paginator(jobs, itemperpage)
    count = len(jobs) 
    jobs = paginator.get_page(pk)
    serializer = JobsSerializer(jobs, many=True)
    new_dict = {"count": count}
    new_dict.update({"jobs": serializer.data})
    return Response(new_dict)

@api_view(['GET'])
@permission_classes([AllowAny])
def userJobList(request, name,page):
    user = get_object_or_404(UserAccount, name=name)
    jobs =Job.objects.filter(user=user).order_by('-date')
    itemperpage = 10
    paginator = Paginator(jobs, itemperpage)
    count = len(jobs)
    jobs = paginator.get_page(page)
    serializer = JobsSerializer(jobs, many=True)
    new_dict = {"count": count}
    new_dict.update({"jobs": serializer.data})
    return Response(new_dict)

@api_view(['POST'])
@permission_classes([AllowAny])
def JobDetail(request, pk):
    job = Job.objects.get(id=pk)
    job.view += 1
    job.save()
    serializer = JobSerializer(job, many=False)
    bookmarked = False
    requested =False
    if request.data.get('user'):
        user = UserAccount.objects.get(id=request.data.get('user'))
        query = JobBookmark.objects.filter(user=user, job=job)
        if query.exists():
            bookmarked = True 
        if user in job.job_requests.all():
            requested = True   

        
    new_dict = {"bookmarked": bookmarked, "requested": requested}
    new_dict.update(serializer.data)
    return Response(new_dict)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def jobRemove(request):
    job = get_object_or_404(Job,user=request.data.get('user'), id=request.data.get('id'))
    job.delete()
    return Response({"id":request.data.get('id')})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def jobCreate(request):
    serializer = NewJobSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['POST'])
@permission_classes([AllowAny])
def request(request):
    job = get_object_or_404(Job, id=request.data.get('id'))
    user = UserAccount.objects.get(id=request.data.get('user'))
    if user in job.job_requests.all():
        job.job_requests.remove(user)
        return Response({"request removed"})
    else:
        job.job_requests.add(user)    
        return Response({"requested"})

@api_view(['POST'])
@permission_classes([AllowAny])
def bookmark(request):
    job = get_object_or_404(Job, id=request.data.get('id'))
    user = UserAccount.objects.get(id=request.data.get('user'))
    query = JobBookmark.objects.filter(user=user, job=job)
    if query.exists():
        fave = JobBookmark.objects.get(job=job, user=user)
        fave.delete()
        return Response({"removed from Bookmark"})
    else:
        fave, created = JobBookmark.objects.get_or_create(job=job, user=user)
        fave.save()
        return Response({"added to Bookmark"})

@api_view(['GET'])
@permission_classes([AllowAny])
def bookmarkList(request, user_id,page):
    user = UserAccount.objects.get(id=user_id)
    bookmarks = JobBookmark.objects.filter(user=user).order_by('-date')
    itemperpage = 5
    paginator = Paginator(bookmarks, itemperpage)
    count = len(bookmarks)
    bookmarks= paginator.get_page(page)
    serializer = BookmarkSerializer(bookmarks, many=True)
    new_dict = {"count": count}
    new_dict.update({"bookmarks": serializer.data})
    return Response(new_dict)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reply(request):
    serializer = ReplySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['GET'])
@permission_classes([AllowAny])
def replyList(request, pk):
    job = Job.objects.get(id=pk)
    replies = JobReply.objects.filter(job=job)
    serializer = ReplySerializer(replies, many=True)
    return Response(serializer.data)
