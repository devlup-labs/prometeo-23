from django.urls import path,include
from .views import *
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register("sponsors",SponsorsViewSet)

router.register("events",EventViewSet)

router.register("brochure",BrochureViewSet)

router.register("gallery",GalleryViewSet)

router.register("theme",ThemeViewSet)

router.register("news",NewsViewSet)

router.register("eventsponsors",EventSponsorsViewSet)

router.register("preregistration",PreRegistrationViewSet)

router.register("signup",ExtendedUserViewSet)

# router.register("login", UserLoginView, basename='login')

urlpatterns=[
    path(r'',include(router.urls)),
    path('login/', views.UserLoginView.as_view(), name='UserLoginView') 
]