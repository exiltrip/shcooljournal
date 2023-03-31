"""File for pair model into database."""

from api.core.model.mixing import CreatedAndIdMixing
from django.db import models
from django.utils.translation import gettext_lazy as _

MAX_LENGTH_IN_STRING = 255


class Pair(CreatedAndIdMixing):
    """Class for pair model into database."""

    teacher_id = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    audit_id = models.ForeignKey('Audience', on_delete=models.CASCADE)
    group_id = models.ForeignKey('Group', on_delete=models.CASCADE)
    start_time = models.DateTimeField(_('datetime start pair'), null=True, blank=True)
    end_time = models.DateTimeField(_('datetime end pair'), null=True, blank=True)
