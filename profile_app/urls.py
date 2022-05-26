from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('api/blog/', include('blog.urls')),
    path('api/accounts/', include('accounts.urls')),
    path('api/message/', include('message.urls')),
    path('api/', include('resume.urls')),
    # path('api/resume/', include('resume.urls')),
    # url(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    # url(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]

admin.site.site_header = 'SAKAR App'
admin.site.index_title = 'Admin panel'
admin.site.site_title = 'SAKAR App'
