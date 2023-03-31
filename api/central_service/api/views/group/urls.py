from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import CategoryViewSet

router = DefaultRouter()
router.register('', CategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
