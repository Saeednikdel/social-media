from django.db import models
from accounts.models import UserAccount
from blog.models import Post, Reply


NOTIF_CHOICES = (
    ("followed you", "followed you"),
    ( "liked your post",  "liked your post"),
    ("replied to you", "replied to you")
)

class Notification(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey(UserAccount, related_name="sender", on_delete=models.CASCADE)
    receiver = models.ForeignKey(UserAccount, related_name="receiver", on_delete=models.CASCADE)
    seen = models.BooleanField(default=False)
    kind = models.CharField(choices=NOTIF_CHOICES, max_length=15)
    post = models.ForeignKey(Post, blank=True, null=True, on_delete=models.CASCADE)
    reply = models.ForeignKey(Reply, blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.receiver.email
    
    def count(self):
        return self.filter(seen=False).count()
