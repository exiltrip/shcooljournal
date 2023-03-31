#!/bin/bash

python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver "$APPLICATION_HOST:$APPLICATION_PORT"
