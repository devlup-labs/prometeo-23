from django.urls import path,include
from .views import *
from . import views
from rest_framework import routers
# from users.views import SignUpViewSet
from django.contrib import admin
from django.urls import path, include
from .views import ExtendedUserViewSet, MyObtainTokenPairView
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

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

# router.register("campusambassador",CampusAmbassadorViewSet)

router.register("team",TeamViewSet)

router.register("coreteam",CoreTeamViewSet)

router.register("robowars",RoboWarsViewSet)

router.register("accomodationpasses",AccomodationPassesViewSet)

# router.register("campusambassadorlistview",CampusAmbassadorListView)

router.register("getevent",GetEventViewSet)

# router.register("logindashboard", LoginDashboardViewSet)

urlpatterns=[
    path(r'',include(router.urls)), 
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', MyObtainTokenPairView.as_view(), name='login'),
    path('google/', views.GoogleView.as_view(), name='google'),
    # path('googlelogin/',GoogleLogin.as_view(), name='google'),
    path('campusambassador/', views.CampusAmbassadorView.as_view(), name='campusambassador'),
    path('logindashboard/', views.LoginDashboardViewSet.as_view(), name='logindashboard'),
    path('usercheck/', UserCheckViewSet.as_view(), name='usercheck'),
    path('google/completeprofile/', views.GoogleCompleteProfileViewSet.as_view(), name='googlecompleteprofile'),
]