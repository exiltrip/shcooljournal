"""Database settings in admin panel application."""

import os

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('POSTGRES_DB'),
        'USER': os.environ.get('POSTGRES_USER'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD'),
        'HOST': 'pg_school_service',
        'PORT': os.environ.get('POSTGRES_DB_PORT', 5432),  # noqa: WPS432
    },
}
