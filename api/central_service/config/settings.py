"""Base setting admin panel application."""

from pathlib import Path

from dotenv import load_dotenv
from split_settings.tools import include

CORS_ORIGIN_ALLOW_ALL = True

load_dotenv()

include(
    'components/database.py',
    'components/installed_apps.py',
    'components/middleware.py',
    'components/templates.py',
    'components/auth_password_validators.py',
    'components/constants.py',
    'components/cache.py',
    'components/rest.py',
    'components/jwt.py',
    'components/djoser.py',
)

BASE_DIR = Path(__file__).resolve(strict=True).parent.parent

ALLOWED_HOSTS = ['*', ]  # noqa: WPS407

INTERNAL_IPS = ['*', ]

LOCALE_PATHS = ['backend/locale']  # path to translate

AUTH_USER_MODEL = "api.CustomUser"
