from django.urls import path
from . import views

urlpatterns = [
    path('post-list/<str:pk>/', views.postList, name="post-list"),
    path('user-post-list/<str:pk>/<str:sk>/', views.userPostList, name="user-post-list"),
    path('post-detail/<str:pk>/', views.postDetail, name="post-detail"),
    path('post-create/', views.postCreate, name="post-create"),

    path('like/', views.like, name="like"),
    path('like-list/<str:pk>/<str:sk>/', views.likeList, name="like-list"),

    path('bookmark/', views.bookmark, name="bookmark"),
    path('bookmark-list/<str:user_id>/<str:page>/', views.bookmarkList, name="bookmark-list"),

    path('reply/', views.reply, name="reply"),
    path('reply-list/<str:pk>/', views.replyList, name="reply-list"),
    
    path('profile-detail/', views.profileDetail, name="profile-detail"),
]
