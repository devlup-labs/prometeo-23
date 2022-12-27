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
from django.core.mail import get_connection, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password
from decouple import config
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from django.conf import settings

User = ExtendedUser


class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


class SponsorsViewSet(viewsets.ModelViewSet):
    queryset = Sponsors.objects.all()
    serializer_class = SponsorsSerializers
    # permission_classes = (IsAuthenticated,)

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
        # payload = {'access_token': request.data.get("token")}  # validate the token
        # r = requests.get('https://www.googleapis.com/oauth2/v2/userinfo', params=payload)
        # data = json.loads(r.text)

        # if 'error' in data:
        #     content = {'message': 'wrong google token / this google token is already expired.'}
        #     return Response(content)

        # create user if not exist

        try:
            user = User.objects.get(email=request.data['email'])
        except User.DoesNotExist:
            user = User()
            # user.username = data['email']
            # provider random default password
            user.email = request.data['email']
            user.password = make_password(BaseUserManager().make_random_password())
            fname = request.data['given_name'].split()[0]
            # lname = request.data['given_name'].split()[1:]
            lname_lis= request.data['given_name'].split()
            lname = " ".join(lname_lis[1:])
            user.first_name = fname
            user.last_name = lname
            # redirect to profile page to complete the profile
            user.save()

        # token = RefreshToken.for_user(user)  # generate token without username & password
        # Add custom claims
        token = MyTokenObtainPairSerializer.get_token(user)
        response = {}
        response['email'] = user.email
        response['first_name'] = user.first_name
        response['last_name'] = user.last_name
        response['access_token'] = str(token.access_token)
        response['refresh_token'] = str(token)
        return Response(response)



class CampusAmbassadorView(APIView):
    queryset = CampusAmbassador.objects.all()
    serializer_class = CampusAmbassadorSerializers
    permission_classes = (IsAuthenticated,)
    print(1)
    def get(self, request):
        ca = CampusAmbassador.objects.all()
        serializer = CampusAmbassadorSerializers(ca, many=True)
        return Response({"ca": serializer.data})
    
    def post(self, request):
        user_email = request.data.get('email')
        user = ExtendedUser.objects.filter(email=user_email).first()
        print(request.data)
        if(CampusAmbassador.objects.filter(email=user_email).exists()):
            ca = CampusAmbassador.objects.filter(email=user_email).first()
            serializers = CampusAmbassadorSerializers(ca)
            referee_dict={}
            referee = ExtendedUser.objects.filter(referral_code=ca.invite_referral).all()
            serializer = CARefereeSerializers(referee,many=True)
            # referee_dict = {'ca':serializer.data}
            # referee_dict['referees']=referee_list
            # data = {'ca':serializers.data} + referee_dict
        
            return Response(serializer.data)

        elif user.referral_code==None or user.referral_code=="":
            print(1)
            ca = CampusAmbassador.objects.create(
                email = user_email,
                ca_count=0,
            )
            code= 'CA' + str(uuid.uuid4().int)[:4] +str(ca.id)[:2]
            user = CampusAmbassador.objects.all()
            def referral_check(c):
                for u in user:
                    if c == u.invite_referral:
                        c = 'CA' + str(uuid.uuid4().int)[:4] +str(ca.id)[:2]
                        referral_check(c)
                return c

            ca.invite_referral = referral_check(code)
            # ca.invite_referral='CA' + str(uuid.uuid4().int)[:4] +str(ca.id)[:2]
            ca.save()
            serializers= CampusAmbassadorSerializers(ca)
            user=ExtendedUser.objects.filter(email=user_email).first()
            user.ambassador=True
            user.invite_referral = ca.invite_referral
            user.ca_count = ca.ca_count
            user.save()
            with get_connection(
                username=settings.EMAIL_HOST_USER,
                password=settings.EMAIL_HOST_PASSWORD
            ) as connection:
                sendMailID = settings.FROM_EMAIL_USER
                # subject = "Registration as Campus Ambassador"
                subject='Registration as Campus Ambassador'
                # message = "You have successfully registered as Campus Ambassador."
                message = f"Congratulations, {user.first_name} you have Successfully Registered as Campus Ambassador in Prometeo '23 - the Techical Fest of IIT Jodhpur ."
                isCA=True
                html_content = render_to_string("Register_confirmation.html", {'first_name': user.first_name,   'message': message, 'isCA':isCA})
                text_content = strip_tags(html_content)
                message = EmailMultiAlternatives(subject=subject, body=text_content, from_email=sendMailID, to=[user.email], connection=connection)
                message.attach_alternative(html_content, "text/html")
                message.mixed_subtype = 'related'
                message.send()
            # msg = f"Congratulations, {user.first_name} you have Successfully Registered as Campus Ambassador in Prometeo '23 - the Techical Fest of IIT Jodhpur ."
            # isCA=True
            # # SENDGRID_API_KEY = config('SENDGRID_API_KEY')
            # SENDGRID_API_KEY = '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'
            # message = Mail(
            #     from_email='no-reply@prometeo.in',
            #     to_emails=user.email,
            #     # reply_to='prometeo@iitj.ac.in',
            #     subject='Registration as Campus Ambassador',
            #     html_content=render_to_string("eventRegister_confirmation.html", {'first_name': user.first_name,   'msg': msg, 'isCA': isCA, 'invite_referral': ca.invite_referral}))
            # try:
            #     sg = SendGridAPIClient(SENDGRID_API_KEY)
                
            #     response = sg.send(message)
            #     print(response.status_code)
            #     print(response.body)
            #     print(response.headers)
            # except Exception as e:
            #     print(e)
            

            return Response(serializers.data)
        else:
            response = {
            'success' : 'False',
            'message': 'CA cannot be created ',
            }
            status_code = status.HTTP_200_OK

            return Response(response, status=status_code)

    # def post(self, request, *args, **kwargs):
    #     # if(request.user.is_authenticated==False):
    #     #     return Response({'message':'User not authenticated'},status=status.HTTP_401_UNAUTHORIZED)
    #     user_email = request.data.get('email')
    #     # user=ExtendedUser.objects.filter(email=request.data.get('email')).first()
    #     if(ExtendedUser.objects.filter(email= user_email)).exists:
    #         if(CampusAmbassador.objects.filter(email=user_email)).exists:
    #             ca = CampusAmbassador.objects.filter(email=user_email).first()
    #             return Response(ca.invite_referral)
    #         else:
    #             ca= CampusAmbassador.objects.create(
    #                 email=user_email,
    #                 invite_referral = 'CA',
    #                 ca_count = 0,
    #             )
    #             ca.save()
    #             ca.invite_referral += str(ca.id)
    #             ca.save()
    #             response = {}
    #             response['referral_code'] =  ca.invite_referral
    #             return Response(response)


        # if(user.ambassador==False):
        #     user.ambassador = True
        #     ca = CampusAmbassador.objects.create(
        #         email = request.data.get('email'),
        #     )
        #     ca.save()
        #     ca.invite_referral = "CA"+str(ca.id)
        #     # invite_referral = 'CA' + str(uuid.uuid4().int)[:6]
        #     # user.invite_referral = invite_referral
        #     # user.save()
        #     # ca.save()
        #     response = {}
        #     response['referral_code'] =  ca.invite_referral
        #     return Response(response)
        # else:
        #     return Response(user.invite_referral)

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
    
class LoginDashboardViewSet(APIView):
    queryset = ExtendedUser.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = LoginDashboardSerializers

    def post(self, request, *args, **kwargs):
        user_email = request.data.get('email')
        if(ExtendedUser.objects.filter(email=user_email)).exists():
            user = ExtendedUser.objects.filter(email=user_email).first()
            serializers = LoginDashboardSerializers(user)
            return Response(serializers.data)

class UserCheckViewSet(APIView):
    queryset = ExtendedUser.objects.all()
    serializer_class = UserCheckSerializers

    def post(self,request):
        email = request.data.get('email')
        if(ExtendedUser.objects.filter(email=email)).exists():
            response = {
            'success' : 'True',
            'status code' : status.HTTP_200_OK,
            'message': 'User exist',
            }
            status_code = status.HTTP_200_OK

            return Response(response, status=status_code)
        else :
            response = {
            'success' : 'False',
            'status code' : status.HTTP_200_OK,
            'message': 'User does not exist',
            }
            status_code = status.HTTP_200_OK

            return Response(response, status=status_code)




# from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
# from dj_rest_auth.registration.views import SocialLoginView
# from allauth.socialaccount.providers.oauth2.client import OAuth2Client
# from django.conf import settings
# from django.views.decorators.csrf import csrf_exempt

# class GoogleLogin(SocialLoginView):
#     authentication_classes = [] # disable authentication
#     adapter_class = GoogleOAuth2Adapter
#     callback_url = "http://localhost:3000"
#     client_class = OAuth2Client

#     @csrf_exempt
#     def google_token(request):

#         if "code" not in request.body.decode():
#             from rest_framework_simplejwt.settings import api_settings as jwt_settings
#             from rest_framework_simplejwt.views import TokenRefreshView
            
#             class RefreshNuxtAuth(TokenRefreshView):
#                 # By default, Nuxt auth accept and expect postfix "_token"
#                 # while simple_jwt library doesnt accept nor expect that postfix
#                 def post(self, request, *args, **kwargs):
#                     request.data._mutable = True
#                     request.data["refresh"] = request.data.get("refresh_token")
#                     request.data._mutable = False
#                     response = super().post(request, *args, **kwargs)
#                     response.data['refresh_token'] = response.data['refresh']
#                     response.data['access_token'] = response.data['access']
#                     return response

#             return RefreshNuxtAuth.as_view()(request)

#         else:
#             return GoogleLogin.as_view()(request)



class RoboWarsViewSet(viewsets.ModelViewSet):
    queryset = RoboWars.objects.all()
    serializer_class = RoboWarsSerializers


class GoogleCompleteProfileViewSet(APIView):
    queryset = ExtendedUser.objects.all()
    serializer_class = GoogleCompleteProfileSerializers
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        user_email = request.data.get('email')
        if(ExtendedUser.objects.filter(email=user_email)).exists():
            user = ExtendedUser.objects.filter(email=user_email).first()
            # serializers = GoogleCompleteProfileSerializers(user)
            # return Response(serializers.data)
            # user.first_name = request.data.get('first_name')
            # user.last_name = request.data.get('last_name')
            user.contact = request.data.get('contact')
            user.college = request.data.get('college')
            user.gender = request.data.get('gender')
            user.city = request.data.get('city')
            user.accomodation = request.data.get('accomodation')
            is_ca = request.data.get('ambassador')
            rc = request.data.get('referral_code')
            if(rc != None and rc != "" and is_ca == False):
                if(ExtendedUser.objects.filter(invite_referral=rc)).exists():
                    user.referral_code = rc
                    # user.ambassador = 
                    user.referred_by = ExtendedUser.objects.filter(invite_referral=rc).first()
                    user.save()
                    myca1 = CampusAmbassador.objects.filter(invite_referral=rc).first()
                    myca1.ca_count += 1
                    myca1.save()
                    myca2 = ExtendedUser.objects.filter(invite_referral=rc).first()
                    myca2.ca_count += 1

            if(is_ca == True and rc == None):
                user.ambassador = True
                ca= CampusAmbassador.objects.create(user=user)
                code= 'CA' + str(uuid.uuid4().int)[:4] +str(ca.id)[:2]
                user = CampusAmbassador.objects.all()
                def referral_check(c):
                    for u in user:
                        if c == u.invite_referral:
                            c = 'CA' + str(uuid.uuid4().int)[:4] +str(ca.id)[:2]
                            referral_check(c)
                    return c

                ca.invite_referral = referral_check(code)
                # ca.invite_referral='CA' + str(uuid.uuid4().int)[:4] +str(ca.id)[:2]
                ca.save()
                user.invite_referral = ca.invite_referral
                with get_connection(
                username=settings.EMAIL_HOST_USER,
                password=settings.EMAIL_HOST_PASSWORD
                ) as connection:
                    sendMailID = settings.FROM_EMAIL_USER
                    # subject = "Registration as Campus Ambassador"
                    subject='Registration as Campus Ambassador'
                    # message = "You have successfully registered as Campus Ambassador."
                    message = f"Congratulations, {user.first_name} you have Successfully Registered as Campus Ambassador in Prometeo '23 - the Techical Fest of IIT Jodhpur ."
                    isCA=True
                    html_content = render_to_string("Register_confirmation.html", {'first_name': user.first_name,   'message': message, 'isCA':isCA})
                    text_content = strip_tags(html_content)
                    message = EmailMultiAlternatives(subject=subject, body=text_content, from_email=sendMailID, to=[user.email], connection=connection)
                    message.attach_alternative(html_content, "text/html")
                    message.mixed_subtype = 'related'
                    message.send()
            
            user.isProfileCompleted = True
            user.save()
            return Response({'success': 'True', 'status code': status.HTTP_200_OK, 'message': 'Profile Updated Successfully'})
        else:
            return Response({'success': 'False', 'status code': status.HTTP_400_BAD_REQUEST, 'message': 'User does not exist'})


class AccomodationPassesViewSet(viewsets.ModelViewSet):
    queryset = Passes.objects.all()
    serializer_class = AccomodationSerializers  
    permission_classes = (IsAuthenticated,)
