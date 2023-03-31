from api.core.api.pagination import FiveResultsSetPagination
from api.core.api.responses import Responses
from api.models import Audience
from api.views.audience.serializers import AudienceSerializer
from django.db.models import QuerySet
from rest_framework import filters
from rest_framework.viewsets import ModelViewSet


class Auditories(ModelViewSet):
    queryset: QuerySet = Audience.objects.all()
    pagination_class = FiveResultsSetPagination
    serializer_class = AudienceSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('name', 'number',)
    ordering_fields = ('name', 'number',)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Responses.make_response(serializer.data)
