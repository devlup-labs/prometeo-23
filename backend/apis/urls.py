from django.urls import path,include
from .views import *
from rest_framework import routers
# from users.views import SignUpViewSet


router = routers.DefaultRouter()
router.register("sponsors",SponsorsViewSet)

router.register("events",EventViewSet)

router.register("brochure",BrochureViewSet)

router.register("gallery",GalleryViewSet)

router.register("theme",ThemeViewSet)

router.register("news",NewsViewSet)

router.register("eventsponsors",EventSponsorsViewSet)

router.register("preregistration",PreRegistrationViewSet)

# router.register("signup",SignUpViewSet)

urlpatterns=[
    path(r'',include(router.urls)), 
]