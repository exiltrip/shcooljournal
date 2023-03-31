from api.models import CustomUser
from django.contrib.auth.models import update_last_login
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """JWT Serializer"""

    def update(self, instance, validated_data):
        super(MyTokenObtainPairSerializer, self).update(
            self, validated_data
        )  # pragma: no cover

    def create(self, validated_data):
        super(MyTokenObtainPairSerializer, self).create(
            validated_data
        )  # pragma: no cover

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['is_super_user'] = self.user.is_superuser
        
        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['email'] = user.email
        token['super_user'] = user.is_superuser
        return token


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("username", "email", "password", "role",)

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ("password",)
