from api.models import Audience
from rest_framework import serializers


class AudienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audience
        fields = '__all__'

    def create(self, validated_data):
        audience, _ = Audience.objects.update_or_create(**validated_data)
        return audience
