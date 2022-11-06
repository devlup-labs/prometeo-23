from django.urls import path,include
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register("sponsors",SponsorsViewSet)

router.register("events",EventViewSet)

router.register("brochure",BrochureViewSet)

router.register("gallery",GalleryViewSet)

router.register("theme",ThemeViewSet)

router.register("news",NewsViewSet)

urlpatterns=[
    path(r'',include(router.urls)),
 
 ]