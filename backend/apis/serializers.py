from rest_framework import serializers
from django.contrib.auth import authenticate
from django.shortcuts import redirect, get_object_or_404
from django.contrib.auth.models import update_last_login
from django.core.mail import get_connection, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from home.models import *
from events.models import *
from coordinator.models import *
from users.models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import requests
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
import uuid
from decouple import config
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        # Add custom claims
        token['username'] = user.first_name+'_'+user.last_name
        token['email'] = user.email
        return token

class SponsorsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Sponsors
        fields = '__all__'

class EventSerializers(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class BrochureSerializers(serializers.ModelSerializer):
    class Meta:
        model = Brochure
        fields = '__all__'

class GallerySerializers(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = '__all__'

class ContactsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Contacts
        fields = '__all__'

class PanelSerializers(serializers.ModelSerializer):
    class Meta:
        model = Panel
        fields = '__all__'

class EventSponsorsSerializers(serializers.ModelSerializer):
    class Meta:
        model = EventSponsors
        fields = '__all__'

class StreamLinksSerializers(serializers.ModelSerializer):
    class Meta:
        model = StreamLinks
        fields = '__all__'

class CoodinatorSerializers(serializers.ModelSerializer):
    class Meta:
        model = Coordinator
        fields = '__all__'

class CarouselSerializers(serializers.ModelSerializer):
    class Meta:
        model = Carousel
        fields = '__all__'

class ThemeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Theme
        fields = '__all__'

class TeamSerializers(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'
        extra_kwargs = {'id' : {'read_only' : True},
                        'isEligible' : {'read_only' : True}}

    def create(self, validated_data):
        user = self.context['request'].user
        # u = get_object_or_404(ExtendedUser, user=user)      
        # if ExtendedUser.objects.filter(self.context['request'].user).exists():
        team = Team.objects.create(
        id = 'PRO' + str(uuid.uuid4().int)[:6],
        name = validated_data['name'],
        leader = self.context['request'].user,
        event = validated_data['event'],
        )
        team.members.add(user)
        team.isEligible()
        
        team.save()

        return team
       

    def update(self,validate_data):
        user = self.context['request'].user
        team = Team.objects.filter(name=validate_data['name'])
        if Team.objects.filter(name=validate_data['name']).exists():
            if team.members.all().count() < team.event.max_team_size:
                team.members.add(user)
                team.save()
                return team
            else :
                return team
        
        else:
            return team


        

class SubmissionsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Submissions
        fields = '__all__'

# class CustomUserSerializers(serializers.ModelSerializer):
#     class Meta:
#         model = ExtendedUser
#         fields = '__all__'

class ExtendedUserSerializers(serializers.ModelSerializer):
    class Meta:
        model = ExtendedUser
        fields = '__all__'
        extra_kwargs = {'password' : {'write_only' : True}}

    def create(self, validated_data):
        user = ExtendedUser.objects.create(
        email=validated_data['email'],
        first_name=validated_data['first_name'],
        last_name=validated_data['last_name'],
        college = validated_data['college'],
        contact = validated_data['contact'],
        city=validated_data['city'],
        accomodation=validated_data['accomodation'],
        )
        user.set_password(validated_data['password'])
        if(validated_data['referral_code'] != ''):
            if(CampusAmbassador.objects.filter(invite_referral=validated_data['referral_code'])).exists():
                ca = ExtendedUser.objects.filter(invite_referral=validated_data['referral_code']).first()
                CA=CampusAmbassador.objects.filter(invite_referral=validated_data['referral_code']).first()
                user.referral_code = validated_data['referral_code']
                user.referred_by = ca
                ca.ca_count += 1
                CA.ca_count +=1
                ca.save()
                CA.save()
        #REGISTRATION ID
        id_registration= 'PRO' + str(uuid.uuid4().int)[:4] +str(user.id)[:2]
        def id_check(c):
            if(ExtendedUser.objects.filter(registration_id=c)).exists():
                c = 'PRO' + str(uuid.uuid4().int)[:4] +str(user.id)[:2]
                id_check(c)
            return c
        id = id_check(id_registration)
        user.registration_id =id
        #CA INVITE REFERRAL
        if (validated_data['ambassador']==True and validated_data['referral_code']==''):
            user.ambassador=True
            ca = CampusAmbassador.objects.create(
                email = validated_data['email'],
                ca_count=0,
            )
            # ca.save()
            code= 'CA' + str(uuid.uuid4().int)[:4] +str(ca.id)[:2]
            def referral_check(c):
                if(CampusAmbassador.objects.filter(invite_referral=c)).exists():
                    c = 'CA' + str(uuid.uuid4().int)[:4] +str(ca.id)[:2]
                    referral_check(c)
                return c
            invite_referral = referral_check(code)
            ca.invite_referral = invite_referral
            user.invite_referral = invite_referral
            ca.save()
            with get_connection(
                    username=settings.EMAIL_HOST_USER,
                    password=settings.EMAIL_HOST_PASSWORD
                ) as connection:
                    sendMailID = settings.FROM_EMAIL_USER
                    subject = "Registration"
                    isCAregistration=True
                    msg = f"Congratulatios, {user.first_name} you have successfully registered in Prometeo'23 - the Technical Fest of IIT Jodhpur ."
                    # message = "You have successfully registered."
                    html_content = render_to_string("Register_confirmation.html", {'first_name': user.first_name,   'msg': msg, 'registration_id':user.registration_id, 'invite_referral':user.invite_referral, 'isCAregistration': isCAregistration})
                    text_content = strip_tags(html_content)
                    message = EmailMultiAlternatives(subject=subject, body=text_content, from_email=sendMailID, to=[user.email], connection=connection)
                    message.attach_alternative(html_content, "text/html")
                    message.mixed_subtype = 'related'
                    message.send()
        else:
            with get_connection(
                    username=settings.EMAIL_HOST_USER,
                    password=settings.EMAIL_HOST_PASSWORD
                ) as connection:
                    sendMailID = settings.FROM_EMAIL_USER
                    subject = "Registration"
                    isRegistration=True
                    msg = f"Congratulatios, {user.first_name} you have successfully registered in Prometeo'23 - the Technical Fest of IIT Jodhpur ."
                    # message = "You have successfully registered."
                    html_content = render_to_string("Register_confirmation.html", {'first_name': user.first_name,   'msg': msg, 'registration_id':user.registration_id, 'isRegistration': isRegistration})
                    text_content = strip_tags(html_content)
                    message = EmailMultiAlternatives(subject=subject, body=text_content, from_email=sendMailID, to=[user.email], connection=connection)
                    message.attach_alternative(html_content, "text/html")
                    message.mixed_subtype = 'related'
                    message.send()
        # msg = f"Congratulatios, {user.first_name} you have successfully registered in Prometeo'23 - the Technical Fest of IIT Jodhpur ."
        # # SENDGRID_API_KEY = config('SENDGRID_API_KEY')
        # SENDGRID_API_KEY = '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'
        # message = Mail(
        #     from_email='no-reply@prometeo.in',
        #     to_emails=user.email,
        #     # reply_to='prometeo@iitj.ac.in',
        #     subject='Registration',
        #     html_content=render_to_string("eventRegister_confirmation.html", {'first_name': user.first_name,   'msg': msg}))
        # try:
        #     sg = SendGridAPIClient(SENDGRID_API_KEY)
            
        #     response = sg.send(message)
        #     print(response.status_code)
        #     print(response.body)
        #     print(response.headers)
        # except Exception as e:
        #     print(e)

        user.save()
        return user

class NewsSerializers(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'


class PreRegistrationSerializers(serializers.ModelSerializer):
    class Meta:
        model = PreRegistration
        fields = '__all__'

class UserLoginSerializer(serializers.Serializer):

    email = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    # def validate(self, data):
    #     email = data.get("email", None)
    #     password = data.get("password", None)
    #     user = authenticate(email=email, password=password)
    #     if user is None:
    #         raise serializers.ValidationError(
    #             'A user with this email and password is not found.'
    #         )
    #     else :
    #         payload = JWT_PAYLOAD_HANDLER(user)
    #         jwt_token = JWT_ENCODE_HANDLER(payload)
    #         update_last_login(None, user)
        
    #     return {
    #         'email':user.email,
    #         'token': jwt_token
    #     }



class CampusAmbassadorSerializers(serializers.ModelSerializer):
    class Meta:
        model = CampusAmbassador
        fields = '__all__'
        extra_kwargs = {'invite_referral' : {'read_only' : True},
                        'ca_count' : {'read_only' : True}
                        }


    def create(self, validated_data):
        if(ExtendedUser.objects.filter(email=validated_data['email']).first().ambassador == False):
            user = ExtendedUser.objects.filter(email=validated_data['email'])
            user.ambassador = True
            ca= CampusAmbassador.objects.filter(email=validated_data['email'])
            user.invite_referral = ca.invite_referral
            user.save()
    #         # invite_referral = 'CA' + str(uuid.uuid4().int)[:6]
    #         # user.invite_referral = invite_referral
    #         # user.save()
            # with get_connection(
            #     username=settings.EMAIL_HOST_USER,
            #     password=settings.EMAIL_HOST_PASSWORD
            # ) as connection:
            #     sendMailID = settings.FROM_EMAIL_USER
            #     subject = "Registration as Campus Ambassador"
            #     message = "You have successfully registered as Campus Ambassador."
            #     html_content = render_to_string("eventRegister_confirmation.html", {'first_name': user.first_name,   'message': message})
            #     text_content = strip_tags(html_content)
            #     message = EmailMultiAlternatives(subject=subject, body=text_content, from_email=sendMailID, to=[user.email], connection=connection)
            #     message.attach_alternative(html_content, "text/html")
            #     message.mixed_subtype = 'related'
            #     message.send()

            return ca
        else:
            ca = CampusAmbassador.objects.filter(email=validated_data['email'])
            return ca
        
class CoreTeamSerializers(serializers.ModelSerializer):
    class Meta:
        model = Coordinator
        fields = '__all__'

class CAViewSerializers(serializers.ModelSerializer):
    class Meta:
        model = ExtendedUser
        fields = ['email', 'first_name', 'last_name', 'college', 'contact', 'city', 'ca_count']
        # fields = '__all__'

class LoginDashboardSerializers(serializers.ModelSerializer):
    class Meta:
        model = ExtendedUser
        fields = '__all__'
        
class CARefereeSerializers(serializers.ModelSerializer):
    class Meta:
        model = ExtendedUser
        fields = ['email','referral_code']
        extra_kwargs = {'referral_code' : {'read_only':True}}

class UserCheckSerializers(serializers.ModelSerializer):
    class Meta:
        model = ExtendedUser
        fields = ['email']