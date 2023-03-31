from api.core.api.pagination import FiveResultsSetPagination
from api.core.api.responses import Responses
from api.models import Group
from api.views.group.serializers import GetGroup, GroupSerializer
from django.db.models import QuerySet
from rest_framework import filters
from rest_framework.viewsets import ModelViewSet


class CategoryViewSet(ModelViewSet):
    queryset: QuerySet = Group.objects.select_related().all()
    pagination_class = FiveResultsSetPagination
    serializer_class = GroupSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('name',)
    ordering_fields = ('name',)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = GetGroup(instance)
        return Responses.make_response(data=serializer.data)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = GetGroup(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = GetGroup(queryset, many=True)
        return Responses.make_response(serializer.data)
