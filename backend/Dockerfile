# FROM python:3.10-alpine
# RUN pip install --upgrade pip
# RUN pip install pipenv
# COPY Pipfile* ./
# RUN PIP_USER=1 PIP_IGNORE_INSTALLED=1 pipenv install --system --deploy --dev \
#     && find /usr/local \
#         \( -type d -a -name test -o -name tests \) \
#         -o \( -type f -a -name '*.pyc' -o -name '*.pyo' \) \
#         -exec rm -rf '{}' \+

# WORKDIR /app
# COPY . /app

# FROM python:3.10-alpine
# RUN pip install --upgrade pip
# RUN pip install pipenv
# COPY Pipfile* Pipfile.lock* ./
# # RUN pipenv run pip install --upgrade setuptools
# RUN pip install --upgrade --force-reinstall setuptools
# RUN PIP_USER=1 PIP_IGNORE_INSTALLED=1 pipenv install --system --deploy --dev \
#     && find /usr/local \
#         \( -type d -a -name test -o -name tests \) \
#         -o \( -type f -a -name '*.pyc' -o -name '*.pyo' \) \
#         -exec rm -rf '{}' \+
# WORKDIR /app
# COPY . /app

FROM python:3.10 as base
RUN pip install pipenv

# Begin our actual build
FROM base as base1
# collectstatic needs the secret key to be set. We store that in this environment variable.
# Set this value in this project's .env file
# ARG DJANGO_SECRET_KEY

RUN mkdir -p /app

COPY . /app
COPY Pipfile  /app/
COPY Pipfile.lock /app/

WORKDIR /app

RUN pipenv install --system --deploy
# RUN python manage.py makemigrations
# RUN python manage.py migrate
# RUN python manage.py runserver 0.0.0.0:8080
# RUN python manage.py collectstatic --no-input