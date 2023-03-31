from typing import Optional

from api.core.api.base import BaseView, CustomCreateAPIView
from api.models import CustomUser
from api.models.user import RoleChoices
from api.views.user.serializers import (CreateUserSerializer,
                                        MyTokenObtainPairSerializer,
                                        UserSerializer)
from django.db.models import QuerySet
from django.shortcuts import get_object_or_404
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairView(TokenObtainPairView):
    """JWT login views"""
    serializer_class = MyTokenObtainPairSerializer


class RegisterUserView(CustomCreateAPIView):
    serializer_class = CreateUserSerializer


class GetUserInfo(BaseView):
    queryset = None

    def get_queryset(self, uuid: Optional[str]) -> QuerySet:
        self.queryset = CustomUser.objects.filter(pk=uuid)
        return self.queryset

    def retrieve(self, request: Optional[Request], uuid: str = None) -> Response:
        self.get_queryset(uuid)
        result = get_object_or_404(self.queryset, pk=uuid)
        serializer = UserSerializer(result)
        return Response(serializer.data)

    def teacher(self, request: Optional[Request]) -> Response:
        users = CustomUser.objects.filter(role=RoleChoices.teach)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
