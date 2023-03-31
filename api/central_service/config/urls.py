from django.contrib import admin
from django.urls import include, path

from .yasg import urlpatterns as doc_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('api.views.user.urls')),
    path('group/', include('api.views.group.urls')),
    path('audience/', include('api.views.audience.urls')),
    path('pair/', include('api.views.pair.urls')),
]

urlpatterns += doc_urls
