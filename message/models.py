from django.db import models
from accounts.models import UserAccount


class Room(models.Model):
    users = models.ManyToManyField(UserAccount, blank=True, related_name="users")
    is_active = models.BooleanField(default=True)
    online_users = models.ManyToManyField(UserAccount, blank=True, related_name="online_users")

    def __str__(self):
        return f"PrivateChatRoom-{self.id}"

    def count(self):
        return self.online_users.count()

class Message(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    content = models.TextField(blank=False)
    seen = models.BooleanField(default=False)

    def __str__(self):
        return self.user.email