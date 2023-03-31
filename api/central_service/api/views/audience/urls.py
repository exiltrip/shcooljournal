from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import Auditories

router = DefaultRouter()
router.register('', Auditories)

urlpatterns = [
    path('', include(router.urls)),
]
