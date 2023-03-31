from api.models import Audience, CustomUser, Group, Pair
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'


class AuditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audience
        fields = '__all__'


class Group_2_Serializer(serializers.ModelSerializer):
    users = UserSerializer(many=True)

    class Meta:
        model = Group
        fields = '__all__'


class BasePairSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pair
        fields = '__all__'

    def create(self, validated_data):
        pair, _ = Pair.objects.update_or_create(**validated_data)
        return pair

    def update(self, instance, validated_data):
        pair, _ = Pair.objects.update_or_create(**validated_data)
        return pair


class GetPairSerializer(serializers.ModelSerializer):
    teacher_id = UserSerializer()
    audit_id = AuditSerializer()
    group_id = Group_2_Serializer()

    class Meta:
        model = Pair
        fields = '__all__'
