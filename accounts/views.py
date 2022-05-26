from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import UserAccount
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator
import math
from django.shortcuts import get_object_or_404
from .serializers import AvatarSerializer
from rest_framework import status
@api_view(['POST'])
@permission_classes([AllowAny])
def follow(request):
    user = get_object_or_404(UserAccount, id=request.data.get('user'))
    target = get_object_or_404(UserAccount ,id=request.data.get('target_id'))
    if target in user.following.all():
        user.following.remove(target)
        target.follower.remove(user)
        return Response({"unfollowed"})
    else:
        if user.following.count() == 0:
            user.following.add(user)
            user.follower.add(user)
        user.following.add(target)
        target.follower.add(user)
        return Response({"followed"})

@api_view(['POST'])
@permission_classes([AllowAny])
def avatar(request):
    user = get_object_or_404(UserAccount,id=request.data.get('id'))
    serializer = AvatarSerializer(data=request.data,instance=user)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)