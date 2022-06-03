from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from accounts.models import UserAccount
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Post, Like, Bookmark, Reply
from .serializers import BookmarkSerializer, LikeSerializer, PostSerializer,NewPostSerializer ,ReplySerializer, PostsSerializer, UserDetailSerializer,FollowerSerializer
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator
import math
from django.shortcuts import get_object_or_404
from notification.models import Notification

@api_view(['POST'])
@permission_classes([AllowAny])
def postList(request, pk):
    if request.data.get('keyword'):
        keyword = request.data.get('keyword')
        posts = Post.objects.filter(content__contains=keyword).order_by('-date')
    elif request.data.get('user'):
        user = UserAccount.objects.get(id=request.data.get('user'))
        posts =Post.objects.filter(user__in=user.following.all()).order_by('-date')
        if posts.count() == 0:
            posts = Post.objects.all().order_by('-date')
    else:
        posts = Post.objects.all().order_by('-date')
    itemperpage = 10
    paginator = Paginator(posts, itemperpage)
    count = len(posts) 
    posts = paginator.get_page(pk)
    serializer = PostsSerializer(posts, many=True)
    new_dict = {"count": count}
    new_dict.update({"posts": serializer.data})
    return Response(new_dict)

@api_view(['GET'])
@permission_classes([AllowAny])
def userPostList(request, name,page):
    user = get_object_or_404(UserAccount, name=name)
    posts =Post.objects.filter(user=user).order_by('-date')
    itemperpage = 10
    paginator = Paginator(posts, itemperpage)
    count = len(posts)
    posts = paginator.get_page(page)
    serializer = PostsSerializer(posts, many=True)
    new_dict = {"count": count}
    new_dict.update({"posts": serializer.data})
    return Response(new_dict)

@api_view(['POST'])
@permission_classes([AllowAny])
def postDetail(request, pk):
    post = Post.objects.get(id=pk)
    post.view += 1
    post.save()
    serializer = PostSerializer(post, many=False)
    bookmarked = False
    liked = False
    if request.data.get('user'):
        user = UserAccount.objects.get(id=request.data.get('user'))
        query = Bookmark.objects.filter(user=user, post=post)
        query2 = Like.objects.filter(user=user, post=post)
        if query.exists():
            bookmarked = True        
        if query2.exists():
            liked = True
        
    new_dict = {"bookmarked": bookmarked, "liked": liked }
    new_dict.update(serializer.data)
    return Response(new_dict)


@api_view(['POST'])
@permission_classes([AllowAny])
def profileDetail(request):
    followed = False
    target = get_object_or_404(UserAccount ,name=request.data.get('name'))
    if request.data.get('user'):
        user = get_object_or_404(UserAccount, id=request.data.get('user'))
        if target in user.following.all():
            followed = True
    serializer = UserDetailSerializer(target, many=False)
    new_dict = {"followed": followed}
    new_dict.update(serializer.data)
    return Response(new_dict)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postCreate(request):
    serializer = NewPostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like(request):
    post = get_object_or_404(Post, id=request.data.get('id'))
    user = UserAccount.objects.get(id=request.data.get('user'))
    query = Like.objects.filter(user=user, post=post)
    if query.exists():
        like = Like.objects.get(post=post, user=user)
        like.delete()
        post.like_count -= 1
        post.save()
        notif = get_object_or_404(Notification, sender=user, post=post, receiver=post.user, kind="L")
        notif.delete()
        return Response({"disliked"})
    else:
        like, created = Like.objects.get_or_create(post=post, user=user)
        like.save()
        post.like_count += 1
        post.save()
        notif, created = Notification.objects.get_or_create(sender=user, post=post, receiver=post.user, kind="L")
        notif.save()
        return Response({"liked"})

@api_view(['GET'])
@permission_classes([AllowAny])
def likeList(request, id, page):
    post = Post.objects.get(id=id)
    likes = Like.objects.filter(post=post).order_by('-date')
    itemperpage = 10
    paginator = Paginator(likes, itemperpage)
    count = len(likes)
    likes = paginator.get_page(page)
    serializer = LikeSerializer(likes, many=True)
    new_dict = {"count": count}
    new_dict.update({"likes": serializer.data})
    return Response(new_dict)

@api_view(['GET'])
@permission_classes([AllowAny])
def followerList(request, name, page):
    user = get_object_or_404(UserAccount ,name=name)
    follower = user.follower.exclude(follower=user)
    itemperpage = 10
    paginator = Paginator(follower, itemperpage)
    count = len(follower)
    follower = paginator.get_page(page)
    serializer = FollowerSerializer(follower, many=True)
    new_dict = {"count": count}
    new_dict.update({"follower": serializer.data})
    return Response(new_dict)

@api_view(['GET'])
@permission_classes([AllowAny])
def followingList(request, name, page):
    user = get_object_or_404(UserAccount ,name=name)
    following = user.following.exclude(following=user)
    itemperpage = 10
    paginator = Paginator(following, itemperpage)
    count = len(following)
    following = paginator.get_page(page)
    serializer = FollowerSerializer(following, many=True)
    new_dict = {"count": count}
    new_dict.update({"following": serializer.data})
    return Response(new_dict)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def bookmark(request):
    post = get_object_or_404(Post, id=request.data.get('id'))
    user = UserAccount.objects.get(id=request.data.get('user'))
    query = Bookmark.objects.filter(user=user, post=post)
    if query.exists():
        fave = Bookmark.objects.get(post=post, user=user)
        fave.delete()
        return Response({"removed from Bookmark"})
    else:
        fave, created = Bookmark.objects.get_or_create(post=post, user=user)
        fave.save()
        return Response({"added to Bookmark"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def bookmarkList(request, user_id,page):
    user = UserAccount.objects.get(id=user_id)
    bookmarks = Bookmark.objects.filter(user=user).order_by('-date')
    itemperpage = 5
    paginator = Paginator(bookmarks, itemperpage)
    count = len(bookmarks)
    bookmarks= paginator.get_page(page)
    serializer = BookmarkSerializer(bookmarks, many=True)
    new_dict = {"count": count}
    new_dict.update({"bookmarks": serializer.data})
    return Response(new_dict)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reply(request):
    serializer = ReplySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['GET'])
@permission_classes([AllowAny])
def replyList(request, pk):
    post = Post.objects.get(id=pk)
    replies = Reply.objects.filter(post=post)
    serializer = ReplySerializer(replies, many=True)
    return Response(serializer.data)