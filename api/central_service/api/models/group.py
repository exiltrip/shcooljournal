"""File for group data."""
from api.core.model.mixing import CreatedAndIdMixing
from django.db import models
from django.utils.translation import gettext_lazy as _

MAX_LENGTH_IN_STRING = 255


class Group(CreatedAndIdMixing):
    """Class for all group."""

    name = models.CharField(_('Group name'), max_length=MAX_LENGTH_IN_STRING)
    users = models.ManyToManyField('CustomUser')

    def __str__(self) -> str:
        """
        Magic method for get group info.

        :return: Group information.
        """
        return '{pk} - {name}'.format(pk=self.id, name=self.name)
