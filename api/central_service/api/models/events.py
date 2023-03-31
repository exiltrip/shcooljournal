"""File for events data."""
from api.core.model.mixing import CreatedAndIdMixing
from django.db import models
from django.utils.translation import gettext_lazy as _

MAX_LENGTH_IN_STRING = 255


class Events(CreatedAndIdMixing):
    """Class for all events."""

    name = models.CharField(_('events name'), max_length=MAX_LENGTH_IN_STRING)
    groups = models.ManyToManyField('Group')

    def __str__(self) -> str:
        """
        Magic method for get group info.

        :return: Group information.
        """
        return '{pk} - {name}'.format(pk=self.id, name=self.name)
