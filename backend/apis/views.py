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
from paytm.models import *
from . import utility
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
from django.conf import settings

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
    queryset = Event.objects.filter(hidden=False).order_by('rank')
    serializer_class = EventSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['type','id','rank']


class GetEventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.filter(hidden=False)
    serializer_class = EventSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id','type']

    def get(self):
        queryset = Event.objects.filter(hidden=False)
        serializer = EventSerializers(queryset, many=True)
        return Response(serializer.data)   

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
            while CampusAmbassador.objects.filter(invite_referral=code).exists():
                code= 'CA' + str(uuid.uuid4().int)[:4] +str(ca.id)[:2]    
            # user = CampusAmbassador.objects.all()
            # def referral_check(c):
            #     for u in user:
            #         if c == u.invite_referral:
            #             c = 'CA' + str(uuid.uuid4().int)[:4] +str(ca.id)[:2]
            #             referral_check(c)
            #     return c

            # ca.invite_referral = referral_check(code)
            # ca.invite_referral='CA' + str(uuid.uuid4().int)[:4] +str(ca.id)[:2]
            ca.invite_referral = code
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


class CampusAmbassadorListView(viewsets.ModelViewSet):
    queryset = ExtendedUser.objects.all()
    serializer_class = CAViewSerializers
    # permission_classes = (IsAuthenticated,)
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
            if(Passes.objects.filter(user=user).exists()):
                pass_user = Passes.objects.filter(user=user).first()
                user.pass_type = pass_user.pass_type
            user.save()
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



# class RoboWarsViewSet(viewsets.ModelViewSet):
#     queryset = RoboWars.objects.all()
#     serializer_class = RoboWarsSerializers

#     def post(self,request,*args,**kwargs):
#         if request.data['rw_id']!=None:
#             rw_id = request.data['rw_id']
#             rw = RoboWars.objects.get(id=rw_id)
#             x = len(rw.team_members.all())
#             if x+1>rw.team_size:
#                 return Response({'message':'Team size exceeded'},status=status.HTTP_400_BAD_REQUEST)
#             else:
#                 rw.team_members.add(request.user)
#                 rw.save()
#                 return Response({'message':'Team member added'},status=status.HTTP_200_OK)
#         else:
#             rw = RoboWars.objects.create(rw_team_size=request.data['team_size'],rw_leader=request.user,team_members=request.user,rw_name=request.data['team_name'],bot_name = request.data['bot_name'],rw_country=request.data['country'],rw_category=request.data['category'])
            
#             # make unique id
            
#             code= 'RW' + str(uuid.uuid4().int)[:4]
            
#             teams = RoboWars.objects.all() 
            
#             def referral_check(c):
#                 for u in teams:
#                     if c == u.rw_id:
#                         c = 'RW' + str(uuid.uuid4().int)[:4]
#                         referral_check(c)
#                 return c

#             rw.rw_id = referral_check(code)

#             rw.save()
#             return Response({'message':'Team created'},status=status.HTTP_200_OK)


class CreateTeamViewSetRW(viewsets.ModelViewSet):
    queryset = RoboWars.objects.all()
    serializer_class = RoboWarsSerializersCreate

    def post(self,request,*args,**kwargs):
        if(RoboWars.objects.filter(rw_name=request.data['rw_name']).exists()):
            return Response({'message':'Team name already exists'},status=status.HTTP_400_BAD_REQUEST)
        return self.create(request, *args, **kwargs)

class UpdateTeamViewSetRW(APIView):
    queryset = RoboWars.objects.all()
    serializer_class = RoboWarsSerializersUpdate

    def post(self,request,*args,**kwargs):
        name = request.data['rw_name']
        rw = RoboWars.objects.get(rw_name=name)
        # rw.rw_team_size = request.data['rw_team_size']
        if(rw.rw_members.count()>=rw.rw_team_size):
            return Response({'message':'Team size exceeded'},status=status.HTTP_400_BAD_REQUEST)
        if(rw.rw_members.filter(email=request.user.email).exists()):
            return Response({'message':'You are already in this team'},status=status.HTTP_400_BAD_REQUEST)
        
        all_teams = RoboWars.objects.all()
        for team in all_teams:
            if team.rw_members.filter(email=request.user.email).exists():
                return Response({'message':'You are already in a team'},status=status.HTTP_400_BAD_REQUEST)
        
        rw.rw_members.add(request.user)
        rw.save()
        return Response({'message':'Team updated'},status=status.HTTP_200_OK)

class CheckTeamViewSetRW(APIView):
    queryset = RoboWars.objects.all()
    # serializer_class = RoboWarsSerializers
    def get(self,request,*args,**kwargs):
        rw = RoboWars.objects.filter(rw_members=request.user)
        if rw.exists():
            # return Response({'message':'You are already in a Team named'},status=status.HTTP_200_OK)
            rw = rw.first()
            # serializers = RoboWarsSerializers(rw)

            if rw.rw_leader == request.user:
                return Response({
                    'team_leader':True,
                    'team_name':rw.rw_name,
                },status=status.HTTP_200_OK)
            else:
                return Response({
                    'team_leader':False,
                    'team_name':rw.rw_name,
                },status=status.HTTP_200_OK)
        else:
            return Response({
                'team_leader':False,
                'team_name':None,
            },status=status.HTTP_200_OK)

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

            id_registration= 'PRO' + str(uuid.uuid4().int)[:4] +str(user.id)[:2]
            while ExtendedUser.objects.filter(registration_id=id_registration).exists():
                id_registration= 'PRO' + str(uuid.uuid4().int)[:4] +str(user.id)[:2]

            user.registration_id =id_registration
            user.save()
            # def id_check(c):
            #     if(ExtendedUser.objects.filter(registration_id=c)).exists():
            #         c = 'PRO' + str(uuid.uuid4().int)[:4] +str(user.id)[:2]
            #         id_check(c)
            #     return c
            # id = id_check(id_registration)
            # user.registration_id =id


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
            

            with get_connection(
                    username=settings.EMAIL_HOST_USER,
                    password=settings.EMAIL_HOST_PASSWORD
                ) as connection:
                    sendMailID = settings.FROM_EMAIL_USER
                    subject = "Registration"
                    isRegistration=True
                    msg = f"Congratulatios, {user.first_name} you have successfully registered in Prometeo '23 - the Technical Fest of IIT Jodhpur ."
                    # message = "You have successfully registered."
                    html_content = render_to_string("Register_confirmation.html", {'first_name': user.first_name,   'msg': msg, 'registration_id':user.registration_id, 'isRegistration': isRegistration})
                    text_content = strip_tags(html_content)
                    message = EmailMultiAlternatives(subject=subject, body=text_content, from_email=sendMailID, to=[user.email], connection=connection)
                    message.attach_alternative(html_content, "text/html")
                    message.mixed_subtype = 'related'
                    message.send()

            user.isProfileCompleted = True
            user.save()
            print(user.isProfileCompleted)
            token = MyTokenObtainPairSerializer.get_token(user)
            response = {}
            response['email'] = user.email
            response['first_name'] = user.first_name
            response['last_name'] = user.last_name
            response['isProfileCompleted'] = user.isProfileCompleted
            response['access_token'] = str(token.access_token)
            response['refresh_token'] = str(token)
            return Response(response)
            # return Response({'success': 'True', 'status code': status.HTTP_200_OK, 'message': 'Profile Updated Successfully'})    
        else:
            return Response({'success': 'False', 'status code': status.HTTP_400_BAD_REQUEST, 'message': 'User does not exist'})


class AccomodationPassesViewSet(viewsets.ModelViewSet):
    queryset = Passes.objects.all()
    serializer_class = AccomodationSerializers  
    permission_classes = (IsAuthenticated,)
    filterset_fields = ['user']

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
        # Passes.objects.create(user=request.user, pass_type=request.data.get('pass_type'), aadhar_card=request.data.get('aadhar_card'),dob=request.data['dob'],address=request.data['address'],full_name=request.user.first_name + " " + request.user.last_name)
        # return Response({'success': 'True', 'status code': status.HTTP_200_OK, 'message': 'Passes Booked Successfully'})



class GetMyEventsView(APIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializers
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        all_events = request.user.events.all()
        if all_events.exists():
            serializers = EventSerializers(all_events, many=True)
            return Response(serializers.data)
        else:
            return Response({'message':'You have not registered for any event'},status=status.HTTP_200_OK)




class RegisterEventViewSet(viewsets.ModelViewSet):
    queryset = ExtendedUser.objects.all()
    serializer_class = RegisterEventSerializers
    permission_classes = (IsAuthenticated,)
    filterset_fields = ['user']

    def post(self, request, *args, **kwargs):
        mail = request.data['email']
        usr = ExtendedUser.objects.get(email=mail)
        event_name = request.data['event_name']
        event = Event.objects.get(event_name=event_name)
        usr.events.add(event)
        usr.save()
        return Response({'success': 'True', 'status code': status.HTTP_200_OK, 'message': 'Event Registered Successfully'})
        

class RegisterEventView(APIView):
    queryset = ExtendedUser.objects.all()
    serializer_class =  RegisterEventSerializers
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        mail = request.data['email']
        usr = ExtendedUser.objects.get(email=mail)
        event_name = request.data['event_name']
        if(usr.events.filter(name=event_name).exists()):
            return Response({'success': 'False', 'status code': status.HTTP_400_BAD_REQUEST, 'message': 'You have already registered for this event'})
        event = Event.objects.get(name=event_name)
        # usr.drone_wars_name = request.data['rw_name']
        usr.events.add(event)
        usr.save()
        return Response({'success': 'True', 'status code': status.HTTP_200_OK, 'message': 'Event Registered Successfully'})

class CheckEventView(APIView):
    queryset = ExtendedUser.objects.all()
    serializer_class =  RegisterEventSerializers
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        mail = request.data['email']
        usr = ExtendedUser.objects.get(email=mail)
        event_name = request.data['event_name']
        if(usr.events.filter(name=event_name).exists()):
            return Response({'status': 'True', 'status code': status.HTTP_200_OK, 'message': 'You have already registered for this event'})
        else:
            return Response({'status': 'False', 'status code': status.HTTP_200_OK, 'message': 'You have not registered for this event'})



class UploadSS(APIView):
    queryset = Passes.objects.all()
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        file = request.data['payment_ss']
        mail = request.data['email']
        usr = ExtendedUser.objects.get(email=mail)
        passusr = Passes.objects.get(user=usr)
        passusr.payment_ss = file
        passusr.save()
        return Response({'success': 'True', 'status code': status.HTTP_200_OK, 'message': 'Screenshot Uploaded Successfully'})

class PaymentViewSet(APIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializers
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        user_id = request.data['user']
        payment_status = request.data['payment_status']
        payment_type = request.data['payment_type']
        User = ExtendedUser.objects.filter(id = user_id).first()
        payment = Payment.objects.create(user_id=user_id,payment_status=payment_status, payment_type=payment_type)
        payment.save()
        amount =1
        if payment.payment_type=="Accommodation":
            amount=1179    
        elif payment.payment_type=="Cultural Night":
            amount=499
        elif payment.payment_type=="Jumbo Pack":
            amount=1088
        
        # amount =1
        if User.registration_id == "" or User.registration_id == None:
            id = 'PRO' + str(uuid.uuid4().int)[:4] +str(User.id)[:2]
            while ExtendedUser.objects.filter(registration_id=id).exists():
                id = 'PRO' + str(uuid.uuid4().int)[:4] +str(User.id)[:2]
            User.registration_id = id

        order_id = User.registration_id + utility.__id_generator__()
        payment.order_id = order_id
        payment.save()
        param_dict = {
        'MID': settings.PAYTM_MID,
        'ORDER_ID': str(order_id),
        'TXN_AMOUNT': str(amount),
        'CUST_ID': User.registration_id,
        'INDUSTRY_TYPE_ID': settings.PAYTM_INDUSTRY_TYPE_ID,
        'WEBSITE': settings.PAYTM_WEBSITE,
        'CHANNEL_ID': settings.PAYTM_CHANNEL_ID,
        'CALLBACK_URL': settings.PAYTM_CALLBACK_URL,
        'MERC_UNQ_REF': settings.PAYTM_MERC_UNQ_REF,
        }
        param_dict['CHECKSUMHASH'] = utility.generate_checksum(param_dict, settings.PAYTM_MERCHANT_KEY)

        serializers = PaymentSerializers(payment)
            
        return Response({'payment':serializers.data, 'param_dict': param_dict})

passtype_dict = {"Accommodation":1, "Cultural Night":2, "Jumbo Pack":3}

class PaymentCallBack(APIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializers
    # permission_classes = (IsAuthenticated,)

    def post(self,request, *args, **kwargs):
        print(request.data)
        response_keys = request.data.keys()
        order_id = request.data['ORDERID']
        if Payment.objects.filter(order_id=order_id).exists():
            payment = Payment.objects.filter(order_id = order_id).first()
            payment.amount = float(request.data['TXNAMOUNT'])
            payment.order_id = request.data['ORDERID']
            payment.checksumhash = request.data['CHECKSUMHASH']
            payment.bank_txn_id = request.data['BANKTXNID']
            payment.payment_mode = request.data['PAYMENTMODE'] if 'PAYMENTMODE' in response_keys else ''
            payment.response_code = request.data['RESPCODE']
            payment.response_msg = request.data['RESPMSG']
            payment.txn_date = request.data['TXNDATE'] if 'TXNDATE' in response_keys else ''
            payment.txn_id = request.data['TXNID']

            if request.data['STATUS'] =='TXN_SUCCESS':
                
                payment.isPaid = True
                payment.payment_status = "Success"
                if Passes.objects.filter(user=payment.user).exists():
                    passtype = Passes.objects.filter(user=payment.user).first()
                    passtype.pass_type = passtype_dict[payment.payment_type]
                    passtype.save()
                elif payment.payment_type=="Cultural Night":
                    passtype = Passes.objects.create(user=payment.user, pass_type=passtype_dict[payment.payment_type])
                    passtype.save()

            elif request.data['STATUS'] =='TXN_FAILURE':
                payment.payment_status = "Failed"
            elif request.data['STATUS'] =='PENDING':
                payment.payment_status = "Aborted"

            msg = payment.response_msg
            code = payment.response_code 
            payment.save()
            return redirect(settings.FRONTEND_URL+"/dashboard?msg="+msg+"&code="+code)
        
        elif CustomOrder.objects.filter(order_id=order_id).exists():
            msg = request.data['RESPMSG']
            code = request.data['RESPCODE']
            return redirect(settings.FRONTEND_URL+"/dashboard?msg="+msg+"&code="+code)
        
class CustomOrderView(APIView):
    queryset = CustomOrder.objects.all()
    serializer_class = CustomOrderSerializers
    permission_classes = (IsAuthenticated,)
    

    def get(self,request, *args, **kwargs):
        custom_all = CustomOrder.objects.all()
        # for custom in custom_all:
        #     if custom.order_id=="" or custom.order_id==None:
        #         order_id = utility.__id_generator__()  + str(uuid.uuid4().int)[:6] 
        #         custom.order_id = order_id
        #         custom.link = settings.FRONTEND_URL+"/payment?id="+order_id
        #         custom.save()
        
        queryset = CustomOrder.objects.all()
        serializer = CustomOrderSerializers(queryset, many=True)
        return Response(serializer.data)

    def post(self,request, *args, **kwargs):
        order_id = request.data['order_id']
        custom = CustomOrder.objects.filter(order_id=order_id).first()
        amount = custom.amount

        param_dict = {
        'MID': settings.PAYTM_MID,
        'ORDER_ID': order_id,
        'TXN_AMOUNT': str(amount),
        'CUST_ID': custom.id,
        'INDUSTRY_TYPE_ID': settings.PAYTM_INDUSTRY_TYPE_ID,
        'WEBSITE': settings.PAYTM_WEBSITE,
        'CHANNEL_ID': settings.PAYTM_CHANNEL_ID,
        'CALLBACK_URL': settings.PAYTM_CALLBACK_URL,
        'MERC_UNQ_REF': settings.PAYTM_MERC_UNQ_REF,
        }
        param_dict['CHECKSUMHASH'] = utility.generate_checksum(param_dict, settings.PAYTM_MERCHANT_KEY)

        serializers = CustomOrderSerializers(custom)


        return Response({'custom_order':serializers.data, 'param_dict': param_dict})
        