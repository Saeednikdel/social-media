from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from accounts.models import UserAccount
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Message, Room
from .serializers import MessageSerializer, RoomSerializer
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator
import math
from django.shortcuts import get_object_or_404

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def roomMsg(request, room, page):
    room = get_object_or_404(Room, id=room)
    msg =Message.objects.filter(room=room).order_by('-date')
    itemperpage = 10
    paginator = Paginator(msg, itemperpage)
    count = len(msg)
    msg = paginator.get_page(page)
    serializer = MessageSerializer(msg, many=True)
    new_dict = {"count": count}
    new_dict.update({"msg": serializer.data})
    return Response(new_dict)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def roomList(request, user, page):
    user = get_object_or_404(UserAccount ,id=user)
    rooms =Room.objects.filter(users=user).order_by('-id')
    itemperpage = 20
    paginator = Paginator(rooms, itemperpage)
    count = len(rooms)
    rooms = paginator.get_page(page)
    serializer = RoomSerializer(rooms, many=True)
    new_dict = {"count": count}
    new_dict.update({"rooms": serializer.data})
    return Response(new_dict)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRoom(request, user1, user2):
    user_1 = get_object_or_404(UserAccount ,id=user1)
    user_2 = get_object_or_404(UserAccount ,id=user2)
    room = Room.objects.filter(users=user_1)
    if room.exists():
        room = room.filter(users=user_2)
        if room.exists():
            room = room.get(users=user_2)
            return Response({"room_id":room.id})
        else:
            new_room = Room()
            new_room.save()
            new_room.users.add(user_1)
            new_room.users.add(user_2)
            return Response({"room_id":new_room.id})
    else:
        new_room = Room()
        new_room.save()
        new_room.users.add(user_1)
        new_room.users.add(user_2)
        return Response({"room_id":new_room.id})