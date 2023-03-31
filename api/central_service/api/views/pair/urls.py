from django.urls import path

from .views import CreatePairView, ListPairView, UpdatePairView

urlpatterns = [
    path('create', CreatePairView.as_view(), name='create__pair'),
    path('all', ListPairView.as_view(), name='list__pair'),
    path('update/<str:pk>', UpdatePairView.as_view(), name='update__pair'),
]
