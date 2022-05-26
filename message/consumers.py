from channels.generic.websocket import AsyncWebsocketConsumer
import json 
from accounts.models import UserAccount
from .models import Room, Message
from django.shortcuts import get_object_or_404
from channels.db import database_sync_to_async


@database_sync_to_async
def save_msg(user, room, msg):
    user = get_object_or_404(UserAccount, id=user)
    room = get_object_or_404(Room, id=room)
    if user in room.users.all():
        m = Message(user=user, room=room, content=msg)
        m.save()

@database_sync_to_async
def check_online(room):
    room = get_object_or_404(Room, id=room)
    return room.count()

@database_sync_to_async
def add_online(user, room):
    user = get_object_or_404(UserAccount, id=user)
    room = get_object_or_404(Room, id=room)
    room.online_users.add(user)

@database_sync_to_async
def remove_online(user, room):
    user = get_object_or_404(UserAccount, id=user)
    room = get_object_or_404(Room, id=room)
    room.online_users.remove(user)
class WSConsumers(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = self.scope['url_route']['kwargs']['room']
        self.id = self.scope['url_route']['kwargs']['userid']
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()
        await add_online(self.id, self.group_name)
        self.online = await check_online(self.group_name)
        event = {
            'type' : 'send_online',
            'online': self.online
        }
        await self.channel_layer.group_send(self.group_name, event)

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)
        await remove_online(self.id, self.group_name)
        print("disconnect user :", self.id)
        self.online = await check_online(self.group_name)
        event = {
            'type' : 'send_online',
            'online': self.online
        }
        await self.channel_layer.group_send(self.group_name, event)
 
 
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        user = text_data_json['user']
        await save_msg(user, self.group_name, message)
        self.online = await check_online(self.group_name)
        event = {
            'type' : 'send_message',
            "message" : message,
            'user': user
        }
        await self.channel_layer.group_send(self.group_name, event)


    async def send_message(self, event):
        message = event['message']
        user = event['user']
        await self.send(text_data=json.dumps({"message": message, 'user': user}))
    
    async def send_online(self, event):
        online = event['online']
        await self.send(text_data=json.dumps({'online':online}))