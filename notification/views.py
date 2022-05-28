from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from accounts.models import UserAccount
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Notification
from .serializers import NotificationSerializer
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator
import math
from django.shortcuts import get_object_or_404

@api_view(['GET'])
@permission_classes([AllowAny])
def notification(request, pk, sk):
    user = get_object_or_404(UserAccount, id=pk)
    notif =Notification.objects.filter(receiver=user).order_by('-date')
    count = len(notif)
    itemperpage = 10
    paginator = Paginator(notif, itemperpage)
    notif = paginator.get_page(count)
    serializer = NotificationSerializer(notif, many=True)
    new_dict = {"count": count}
    new_dict.update({"notification": serializer.data})
    return Response(new_dict)


