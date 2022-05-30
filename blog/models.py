from django.db import models
from accounts.models import UserAccount


class Post(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    like_count = models.IntegerField(default=0)
    date = models.DateTimeField(auto_now_add=True)
    view = models.IntegerField(default=0)
    content = models.TextField()
    image = models.ImageField()

    def __str__(self):
        return self.user.email
    
    def short_content(self):
        return (self.content)[:150]


class Reply(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.CharField(max_length=1000)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.email


class Like(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.email


class Bookmark(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.email