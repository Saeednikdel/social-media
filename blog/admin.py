from django.contrib import admin
from .models import Post, Reply, Like, Bookmark

admin.site.register(Post)
admin.site.register(Reply)
admin.site.register(Like)
admin.site.register(Bookmark)
