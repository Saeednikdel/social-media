from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import UserAccount
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator
from django.shortcuts import get_object_or_404
from .serializers import AvatarSerializer, UserSetSerializer, HeaderSerializer,UserSerializer
from rest_framework import status
from notification.models import Notification

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow(request):
    user = get_object_or_404(UserAccount, id=request.data.get('user'))
    target = get_object_or_404(UserAccount ,name=request.data.get('target_name'))
    if target in user.following.all():
        user.following.remove(target)
        target.follower.remove(user)
        notif = get_object_or_404(Notification, sender=user, receiver=target, kind="F")
        notif.delete()
        return Response({"unfollowed"})
    else:
        if user.following.count() == 0:
            user.following.add(user)
            user.follower.add(user)
        user.following.add(target)
        target.follower.add(user)
        notif, created = Notification.objects.get_or_create(sender=user, receiver=target, kind="F")
        notif.save()
        return Response({"followed"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def avatar(request):
    user = get_object_or_404(UserAccount,id=request.data.get('id'))
    serializer = AvatarSerializer(data=request.data, instance=user)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def header(request):
    user = get_object_or_404(UserAccount,id=request.data.get('id'))
    serializer = HeaderSerializer(data=request.data, instance=user)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def userSet(request):
    user = get_object_or_404(UserAccount ,id=request.data.get('id'))
    serializer = UserSetSerializer(instance=user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def userList(request,page):
    if request.data.get('keyword'):
        users =UserAccount.objects.filter(name__contains=request.data.get('keyword'))
    else:
        users =UserAccount.objects.all()
    itemperpage = 10
    paginator = Paginator(users, itemperpage)
    count = len(users)
    users = paginator.get_page(page)
    serializer = UserSerializer(users, many=True)
    new_dict = {"count": count}
    new_dict.update({"users": serializer.data})
    return Response(new_dict)