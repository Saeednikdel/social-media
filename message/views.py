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
@permission_classes([AllowAny])
def roomMsg(request, pk):
    room = get_object_or_404(Room, id=pk)
    msg =Message.objects.filter(room=room).order_by('date')
    itemperpage = 101
    paginator = Paginator(msg, itemperpage)
    count = math.ceil(len(msg) / itemperpage)
    msg = paginator.get_page(count)
    serializer = MessageSerializer(msg, many=True)
    new_dict = {"count": count}
    new_dict.update({"msg": serializer.data})
    return Response(new_dict)

@api_view(['GET'])
@permission_classes([AllowAny])
def roomList(request, pk):
    user = UserAccount.objects.get(id=pk)
    rooms =Room.objects.filter(users=user)
    serializer = RoomSerializer(rooms, many=True)
    return Response(serializer.data)