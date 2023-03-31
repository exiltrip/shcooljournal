from api.models import Group
from api.views.user.serializers import UserSerializer
from rest_framework import serializers


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'

    def create(self, validated_data):
        users = validated_data.pop('users')
        group, _ = Group.objects.update_or_create(**validated_data)
        for user in users:
            group.users.add(user)
        return group


class GetGroup(serializers.ModelSerializer):
    users = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Group
        fields = '__all__'
