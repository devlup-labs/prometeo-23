from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from apis.models import *
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication 
from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly
from . import permissions
from .serializers import *
from home.models import *
from events.models import *
from coordinator.models import *
from users.models import *
import requests
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from .serializers import MyTokenObtainPairSerializer
from rest_framework.utils import json
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User

from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password


class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


class SponsorsViewSet(viewsets.ModelViewSet):
    queryset = Sponsors.objects.all()
    serializer_class = SponsorsSerializers
    permission_classes = (IsAuthenticated,)

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['type','id']

class BrochureViewSet(viewsets.ModelViewSet):
    queryset = Brochure.objects.all()
    serializer_class = BrochureSerializers

class GalleryViewSet(viewsets.ModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializers

class ContactsViewSet(viewsets.ModelViewSet):
    queryset = Contacts.objects.all()
    serializer_class = ContactsSerializers

class PanelViewSet(viewsets.ModelViewSet):
    queryset = Panel.objects.all()
    serializer_class = PanelSerializers

class EventSponsorsViewSet(viewsets.ModelViewSet):
    queryset = EventSponsors.objects.all()
    serializer_class = EventSponsorsSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['event']

class StreamLinksViewSet(viewsets.ModelViewSet):
    queryset = StreamLinks.objects.all()
    serializer_class = StreamLinksSerializers

class CoordinatorViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = CoodinatorSerializers

class CarouselViewSet(viewsets.ModelViewSet):
    queryset = Carousel.objects.all()
    serializer_class = CarouselSerializers

class ThemeViewSet(viewsets.ModelViewSet):
    queryset = Theme.objects.all()
    serializer_class = ThemeSerializers

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializers
    permission_classes = [IsAuthenticatedOrReadOnly]

    def post(self, request, *args, **kwargs):
        if Team.objects.filter(name=request.name).exists():
            return self.update(request, *args, **kwargs )
        else :
            return self.create(request, *args, **kwargs)


class SubmissionsViewSet(viewsets.ModelViewSet):
    queryset = Submissions.objects.all()
    serializer_class = SubmissionsSerializers
    
class ExtendedUserViewSet(viewsets.ModelViewSet):
    queryset = ExtendedUser.objects.all()
    serializer_class = ExtendedUserSerializers
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)
    # permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializers

class PreRegistrationViewSet(viewsets.ModelViewSet):
    queryset = PreRegistration.objects.all()
    serializer_class = PreRegistrationSerializers

# class LoginViewSet(viewsets.ViewSet):

#     serializer_class = AuthTokenSerializer

#     def create(self, request):

#         return ObtainAuthToken().post(request)

class UserLoginView(RetrieveAPIView):

    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = {
            'success' : 'True',
            'status code' : status.HTTP_200_OK,
            'message': 'User logged in  successfully',
            'token' : serializer.data['token'],
            }
        status_code = status.HTTP_200_OK

        return Response(response, status=status_code)
    

class GoogleView(APIView):
    def post(self, request):
        payload = {'access_token': request.data.get("token")}  # validate the token
        r = requests.get('https://www.googleapis.com/oauth2/v2/userinfo', params=payload)
        data = json.loads(r.text)

        if 'error' in data:
            content = {'message': 'wrong google token / this google token is already expired.'}
            return Response(content)

        # create user if not exist
        try:
            user = User.objects.get(email=data['email'])
        except User.DoesNotExist:
            user = User()
            user.username = data['email']
            # provider random default password
            user.password = make_password(BaseUserManager().make_random_password())
            user.email = data['email']
            # redirect to profile page to complete the profile
            user.save()

        token = RefreshToken.for_user(user)  # generate token without username & password
        response = {}
        response['username'] = user.username
        response['access_token'] = str(token.access_token)
        response['refresh_token'] = str(token)
        return Response(response)



class CampusAmbassadorView(APIView):
    queryset = ExtendedUser.objects.all()
    serializer_class = CampusAmbassadorSerializers
    permission_classes = (IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        if(request.user.is_authenticated==False):
            return Response({'message':'User not authenticated'},status=status.HTTP_401_UNAUTHORIZED)
        user=request.user
        if(user.ambassador==False):
            user.ambassador = True
            invite_referral = 'CA' + str(uuid.uuid4().int)[:6]
            user.invite_referral = invite_referral
            user.save()
            return user
        else:
            return user

class CoreTeamViewSet(viewsets.ModelViewSet):
    queryset = Coordinator.objects.all()
    serializer_class = CoreTeamSerializers


class CampusAmbassadorListView(APIView):
    queryset = ExtendedUser.objects.all()
    serializer_class = CAViewSerializers
    permission_classes = (IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        # if(request.user.is_authenticated==False):
        #     return Response({'message':'User not authenticated'},status=status.HTTP_401_UNAUTHORIZED)
        # user=request.user
        # if(user.ambassador==False):
        #     return Response({'message':'User not a Campus Ambassador'},status=status.HTTP_401_UNAUTHORIZED)
        # else:
            queryset = ExtendedUser.objects.filter(ambassador=True)
            serializer = CampusAmbassadorSerializers(queryset, many=True)
            return Response(serializer.data)
    
