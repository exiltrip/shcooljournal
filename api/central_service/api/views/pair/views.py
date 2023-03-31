import datetime

from api.core.api.base import (CustomCreateAPIView, CustomListAPIView,
                               CustomUpdateAPIView)
from api.core.api.responses import Responses
from api.models import CustomUser, Pair
from api.models.user import RoleChoices
from api.views.pair.serializers import BasePairSerializer, GetPairSerializer
from requests import Response
from rest_framework import filters


class CreatePairView(CustomCreateAPIView):
    serializer_class = BasePairSerializer
    queryset = None

    def get_queryset(self):
        group_id = self.request.data.get('group_id')
        start_time = self.request.data.get('start_time').replace('T', ' ')
        end_time = self.request.data.get('end_time').replace('T', ' ')

        if start_time == '':
            return None

        if end_time == '':
            return None

        start_time = datetime.datetime.strptime(start_time, '%Y-%m-%d %H:%M')
        end_time = datetime.datetime.strptime(end_time, '%Y-%m-%d %H:%M')

        start_day = start_time.date()
        end_day = end_time.date() + datetime.timedelta(days=1)

        queryset = Pair.objects.filter(end_time__date__range=(start_day, end_day), group_id=group_id)
        return queryset

    def get_teach_pairs(self):
        start_time = self.request.data.get('start_time').replace('T', ' ')
        end_time = self.request.data.get('end_time').replace('T', ' ')
        teacher_id = self.request.data.get('teacher_id')

        start_time = datetime.datetime.strptime(start_time, '%Y-%m-%d %H:%M')
        end_time = datetime.datetime.strptime(end_time, '%Y-%m-%d %H:%M')

        start_day = start_time.date()
        end_day = end_time.date() + datetime.timedelta(days=1)

        queryset = Pair.objects.filter(end_time__date__range=(start_day, end_day), teacher_id=teacher_id)
        return queryset

    def get_pairs_for_check(self):
        start_time = self.request.data.get('start_time').replace('T', ' ')
        end_time = self.request.data.get('end_time').replace('T', ' ')
        start_time = datetime.datetime.strptime(start_time, '%Y-%m-%d %H:%M')
        end_time = datetime.datetime.strptime(end_time, '%Y-%m-%d %H:%M')
        teacher_id = self.request.data.get('teacher_id')
        queryset = Pair.objects.filter(end_time__date__range=(start_time, end_time), teacher_id=teacher_id)
        return queryset

    def get_group_for_check(self):
        start_time = self.request.data.get('start_time').replace('T', ' ')
        end_time = self.request.data.get('end_time').replace('T', ' ')
        start_time = datetime.datetime.strptime(start_time, '%Y-%m-%d %H:%M')
        end_time = datetime.datetime.strptime(end_time, '%Y-%m-%d %H:%M')
        group_id = self.request.data.get('group_id')
        queryset = Pair.objects.filter(end_time__date__range=(start_time, end_time), group_id=group_id)
        return queryset

    def create(self, request, *args, **kwargs) -> Response:
        queryset = self.get_queryset()

        if queryset is None:
            return Responses.make_response(
                error=True,
                message='Start time and end time is not none.',
            )

        if len(queryset) > 4:
            return Responses.make_response(
                error=True,
                message='Sorry, but you cannot create more than 4 pairs per day for a given group',
            )

        pairs = self.get_teach_pairs()

        if len(pairs) > 4:
            return Responses.make_response(
                error=True,
                message='Sorry, this teacher has reached the limit of lessons for today.'
            )

        teacher = CustomUser.objects.get(pk=self.request.data.get('teacher_id'))

        if teacher.role != RoleChoices.teach:
            return Responses.make_response(
                error=True,
                message='Sorry, but the teacher cannot be a student.'
            )

        if teacher.hospital:
            return Responses.make_response(
                error=True,
                message='Sorry, this teacher in hospital and don`t work this time.',
            )

        checker_queryset = self.get_pairs_for_check()

        if len(checker_queryset) > 0:
            return Responses.make_response(
                error=True,
                message='Sorry, but this teacher already has a couple going on.',
            )

        group_queryset = self.get_group_for_check()

        if len(group_queryset) > 0:
            return Responses.make_response(
                error=True,
                message='Sorry, but this group already has a couple.',
            )

        teacher.hour_month += 1.5
        teacher.save()

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)
        return Responses.make_response(data=serializer.data)


class ListPairView(CustomListAPIView):
    serializer_class = GetPairSerializer
    queryset = Pair.objects.select_related().all()

    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('audit_id__id', 'start_time', 'end_time', 'teacher_id__id', 'group_id__id')
    ordering_fields = ('start_time', 'end_time', )


class UpdatePairView(CustomUpdateAPIView):
    serializer_class = BasePairSerializer

    def get_queryset(self):
        group_id = self.request.data.get('group_id')
        start_time = self.request.data.get('start_time').replace('T', ' ')
        end_time = self.request.data.get('end_time').replace('T', ' ')

        if start_time == '':
            return None

        if end_time == '':
            return None

        start_time = datetime.datetime.strptime(start_time, '%Y-%m-%d %H:%M')
        end_time = datetime.datetime.strptime(end_time, '%Y-%m-%d %H:%M')

        start_day = start_time.date()
        end_day = end_time.date() + datetime.timedelta(days=1)

        queryset = Pair.objects.filter(end_time__date__range=(start_day, end_day), group_id=group_id)
        return queryset

    def checker_start_and_end(self):
        start_time = self.request.data.get('start_time').replace('T', ' ')
        end_time = self.request.data.get('end_time').replace('T', ' ')
        start_time = datetime.datetime.strptime(start_time, '%Y-%m-%d %H:%M')
        end_time = datetime.datetime.strptime(end_time, '%Y-%m-%d %H:%M')
        return start_time > end_time

    def get_teach_pairs(self):
        start_time = self.request.data.get('start_time').replace('T', ' ')
        end_time = self.request.data.get('end_time').replace('T', ' ')
        teacher_id = self.request.data.get('teacher_id')

        start_time = datetime.datetime.strptime(start_time, '%Y-%m-%d %H:%M')
        end_time = datetime.datetime.strptime(end_time, '%Y-%m-%d %H:%M')

        start_day = start_time.date()
        end_day = end_time.date() + datetime.timedelta(days=1)

        queryset = Pair.objects.filter(end_time__date__range=(start_day, end_day), teacher_id=teacher_id)
        return queryset

    def get_pairs_for_check(self):
        start_time = self.request.data.get('start_time').replace('T', ' ')
        end_time = self.request.data.get('end_time').replace('T', ' ')
        start_time = datetime.datetime.strptime(start_time, '%Y-%m-%d %H:%M')
        end_time = datetime.datetime.strptime(end_time, '%Y-%m-%d %H:%M')
        teacher_id = self.request.data.get('teacher_id')
        queryset = Pair.objects.filter(end_time__date__range=(start_time, end_time), teacher_id=teacher_id)
        if queryset:
            return queryset
        return None

    def get_group_for_check(self):
        start_time = self.request.data.get('start_time').replace('T', ' ')
        end_time = self.request.data.get('end_time').replace('T', ' ')
        start_time = datetime.datetime.strptime(start_time, '%Y-%m-%d %H:%M')
        end_time = datetime.datetime.strptime(end_time, '%Y-%m-%d %H:%M')
        group_id = self.request.data.get('group_id')
        queryset = Pair.objects.filter(end_time__date__range=(start_time, end_time), group_id=group_id)
        return queryset

    def update(self, request, *args, **kwargs):

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        queryset = self.get_queryset()

        if queryset is None:
            return Responses.make_response(
                error=True,
                message='Start time and end time is not none.',
            )

        if len(queryset) > 4:
            return Responses.make_response(
                error=True,
                message='Sorry, but you cannot create more than 4 pairs per day for a given group',
            )

        if self.checker_start_and_end():
            return Responses.make_response(
                error=True,
                message='Start time don`t > end time.',
            )

        pairs = self.get_teach_pairs()

        if len(pairs) > 4:
            return Responses.make_response(
                error=True,
                message='Sorry, this teacher has reached the limit of lessons for today.'
            )

        teacher = CustomUser.objects.get(pk=self.request.data.get('teacher_id'))

        if teacher.role != RoleChoices.teach:
            return Responses.make_response(
                error=True,
                message='Sorry, but the teacher cannot be a student.'
            )

        if teacher.hospital:
            return Responses.make_response(
                error=True,
                message='Sorry, this teacher in hospital and don`t work this time.',
            )

        checker_queryset = self.get_pairs_for_check()

        if len(checker_queryset) > 0:
            return Responses.make_response(
                error=True,
                message='Sorry, but this teacher already has a couple going on.',
            )

        group_queryset = self.get_group_for_check()

        if len(group_queryset) > 0:
            return Responses.make_response(
                error=True,
                message='Sorry, but this group already has a couple.',
            )

        teacher.hour_month += 1.5
        teacher.save()

        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Responses.make_response(data=serializer.data)

    def perform_update(self, serializer):
        serializer.save()

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)
