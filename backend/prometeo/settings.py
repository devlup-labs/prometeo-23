"""
Django settings for prometeo project.

Generated by 'django-admin startproject' using Django 4.0.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.0/ref/settings/
"""

import os
from decouple import config
from django.core.management import utils
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATE_DIR = os.path.join(BASE_DIR, 'templates')
from datetime import timedelta
# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY', cast=str)
# SECRET_KEY="q$o5mx19x9(9_^rzqf@o@s^t%t!ghix7($f9ymy49_^ryzq9x9"
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config('DEBUG', default=False, cast=bool)
# DEBUG = True


# ALLOWED_HOSTS = ['prometeo.iitj.ac.in', '192.168.43.110', '127.0.0.1', '142.93.216.166', 'dev.prometeo.in', 'prometeo.in', 'www.prometeo.in', 'localhost','192.168.2.1','172.31.51.79']
ALLOWED_HOSTS=['*']
# CORS_ORIGIN_ALLOW_ALL = True

CORS_ORIGIN_ALLOW_ALL = False
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'https://prometeo.in',
    # 'http://172.31.12.81:3000',
    'http://172.31.51.79:3000',
    'https://prometeo-23-4jejhinhh-sawmill811.vercel.app'
    # '127.0.0.1:8000'
]    


# Application definition

INSTALLED_APPS = [
    'home',
    'events',
    'coordinator',
    'users',
    'dashboard',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sites',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    # 'allauth.socialaccount.providers.facebook',
    'crispy_forms',
    'widget_tweaks',
    'django_inlinecss',
    'ckeditor',
    'captcha',
    'rest_framework',
    'apis',
    'django_filters',
    'corsheaders',
    'django_extensions',
    'import_export',
    'rest_framework_simplejwt',
    "rest_framework.authtoken",
    # Auth & social auth
    "dj_rest_auth",
    "dj_rest_auth.registration",
    "paytm",
]

CRISPY_TEMPLATE_PACK = 'bootstrap4'

SITE_ID = 1

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # 'users.middleware.MoveJWTRefreshCookieIntoTheBody',
]

ROOT_URLCONF = 'prometeo.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'prometeo.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

if config('SQLITE_DB', cast=bool):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': config('DB_NAME'),
            'USER': config('DB_USER'),
            'PASSWORD': config('DB_PASSWORD'),
            'HOST': config('DB_HOST', default='localhost'),
            'PORT': config('DB_PORT', cast=int, default=5432),
        }
    }

AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
)


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Calcutta'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/
# STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'prometeo/static')]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

# DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

SERVER_EMAIL = "prometeoiitj23@gmail.com"

# email config
DEFAULT_FROM_EMAIL = config('SERVER_EMAIL', cast=str)

EMAIL_USE_TLS = True
EMAIL_USE_SSL = False
EMAIL_PORT = config('SERVER_EMAIL_PORT', cast=int, default=587)
EMAIL_HOST = config('SERVER_EMAIL_HOST', cast=str, default="smtp.gmail.com")
EMAIL_HOST_USER = config('SERVER_EMAIL_USER', cast=str)
FROM_EMAIL_USER = config('SERVER_EMAIL', cast=str)
EMAIL_HOST_PASSWORD = config('SERVER_EMAIL_PASSWORD', cast=str)
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

EVENTS_MAIL_RECEPIENTS = config('EVENTS_MAIL_RECEPIENTS', cast=str)

AUTH_USER_MODEL = 'users.ExtendedUser'

# django-allauth registraion settings
ACCOUNT_EMAIL_CONFIRMATION_EXPIRE_DAYS = 0.25
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = "mandatory"
ACCOUNT_LOGIN_ATTEMPTS_LIMIT = 5

ACCOUNT_USER_MODEL_EMAIL_FIELD = 'email'
# ACCOUNT_USER_MODEL_USERNAME_FIELD = 'email'
SOCIALACCOUNT_QUERY_EMAIL = True
SOCIALACCOUNT_EMAIL_REQUIRED = True
SOCIAL_AUTH_REDIRECT_IS_HTTPS = True

ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_UNIQUE_EMAIL = True


LOGIN_REDIRECT_URL = "/"

ACCOUNT_FORMS = {
    'signup': 'users.forms.SignUpForm',
    'login': 'users.forms.CustomLoginForm'
}

ACCOUNT_ADAPTER = 'prometeo.account_adapter.NoNewUsersAccountAdapter'

RECAPTCHA_PUBLIC_KEY = config('RECAPTCHA_PUBLIC_KEY', cast=str)
RECAPTCHA_PRIVATE_KEY = config('RECAPTCHA_PRIVATE_KEY', cast=str)
RECAPTCHA_USE_SSL = config('RECAPTCHA_USE_SSL', cast=str, default=True)


ADMINS = [('Yash', 'bhargava.3@iitj.ac.in'), ('Soumil', 'sinha.5@iitj.ac.in'), ('Rahul', 'gopathi.1@iitj.ac.in'), ('Samkit', 'shah.11@iitj.ac.in'), ('Rohit', 'kori.1@iitj.ac.in'), ('Yuvraj', 'rathva.1@iitj.ac.in'), ('Pranav', 'pant.4@iitj.ac.in'), ('Saisanthosh', 'sai.9@iitj.ac.in') ]
MANAGERS = ADMINS

# AWS Conigs
AWS_ACCESS_KEY = config('AWS_ACCESS_KEY', cast=str)
AWS_SECRET_KEY = config('AWS_SECRET_KEY', cast=str)
AWS_BUCKET = config('AWS_BUCKET', cast=str)

# ckeditor configs
CKEDITOR_CONFIGS = {
    'default': {
        'toolbar': 'Basic',
        'width': '100%',
        'tabSpaces': 4,
        'mathJaxLib': 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS_HTML',
        'toolbar_Basic': [
            {'name': 'clipboard', 'items': ['Source', 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']},
            {'name': 'editing', 'items': ['Find', 'Replace', ]},
            {'name': 'basicstyles',
             'items': ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']},
            {'name': 'formulae', 'items': ['Mathjax']},
            {'name': 'insert',
             'items': ['Link', 'Image', 'Table', 'HorizontalRule', 'Smiley', ]},
            {'name': 'colors', 'items': ['TextColor', 'BGColor']},
            {'name': 'paragraph',
             'items': ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', '-',
                       'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', ]},
            {'name': 'styles', 'items': ['Styles', 'Format', 'Font', 'FontSize']},
        ],
    },
}


REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
#          "rest_framework.authentication.BasicAuthentication",
# +        "rest_framework.authentication.SessionAuthentication",
      "dj_rest_auth.utils.JWTCookieAuthentication",
    ),
    'DEFAULT_SCHEMA_CLASS':
        'rest_framework.schemas.coreapi.AutoSchema',
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=24),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=50),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': False,

    'ALGORITHM': 'HS256',

    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'JWK_URL': None,
    'LEEWAY': 0,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}


SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': [
            'profile',
            'email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
        }
    }
}

# REST_SESSION_LOGIN = False
# REST_USE_JWT = True
# JWT_AUTH_COOKIE = 'jwt-access-token'          
# JWT_AUTH_REFRESH_COOKIE = 'jwt-refresh-token' 
# JWT_AUTH_SECURE = True
# CORS_ALLOW_CREDENTIALS = True

# SECURE_SSL_REDIRECT = False


# RAZORPAY_KEY_ID = YOUR_KEY_ID
# RAZORPAY_KEY_SECRET = YOUR_KEY_SECRET



DEFAULT_AUTO_FIELD='django.db.models.AutoField'
