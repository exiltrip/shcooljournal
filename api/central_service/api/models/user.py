"""Base file for user models."""
from api.core.model.mixing import CreatedAndIdMixing
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

MAX_LENGTH_IN_STRING = 255
DEFAULT_HOUR_MONTH = 0.0  # noqa: WPS358


class RoleChoices(models.TextChoices):
    """Class choices from film work."""

    student = 'Student', _('student')
    teach = 'Teach', _('Teacher')
    ghost = 'Ghost', _('Ghost')


class CustomUser(CreatedAndIdMixing, AbstractUser):
    """Class for custom user model into service."""

    role = models.CharField(_('Role field'), max_length=MAX_LENGTH_IN_STRING, null=True, choices=RoleChoices.choices)
    hour_month = models.FloatField(_('Field for hour month'), null=True, default=DEFAULT_HOUR_MONTH)
    vacation = models.BooleanField(_('Vacation field for user.'), null=True, default=False)
    hospital = models.BooleanField(_('hospital field for user.'), null=True, default=False)
    group_id = models.ForeignKey('Group', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self) -> str:
        """
        Magic method function for get info from current user.

        :return: self username and self email.
        """
        return '{username} - {email}'.format(username=self.username, email=self.email)
