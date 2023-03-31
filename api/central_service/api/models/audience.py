"""File for audience model."""
from api.core.model.mixing import CreatedAndIdMixing
from django.db import models
from django.utils.translation import gettext_lazy as _

MAX_LENGTH_IN_STRING = 255


class Audience(CreatedAndIdMixing):
    """Class for audience model into database."""

    name = models.CharField(_('audience name'), max_length=MAX_LENGTH_IN_STRING)
    number = models.IntegerField(_('number audience'))

    def __str__(self) -> str:
        """
        Magic method function for get info from current audience.

        :return: audience info.
        """
        return '{name} - {number}'.format(name=self.name, number=self.number)
