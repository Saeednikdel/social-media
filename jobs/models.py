from django.db import models
from accounts.models import UserAccount


class Job(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name="user")
    date = models.DateTimeField(auto_now_add=True)
    expire_date = models.DateField(blank=True,null=True)
    view = models.IntegerField(default=0)
    content = models.TextField()
    image = models.ImageField()
    job_requests = models.ManyToManyField(UserAccount, related_name='job_requests')

    def __str__(self):
        return self.user.email
    
    def short_content(self):
        return (self.content)[:150]

class JobReply(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    text = models.CharField(max_length=1000)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.email


class JobBookmark(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.email