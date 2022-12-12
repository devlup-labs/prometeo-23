from rest_framework import serializers
from django.contrib.auth import authenticate
from django.shortcuts import redirect, get_object_or_404
from django.contrib.auth.models import update_last_login
from home.models import *
from events.models import *
from coordinator.models import *
from users.models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import requests
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
import uuid

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        # Add custom claims
        token['username'] = user.first_name+user.last_name
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
        city=validated_data['city']
        )
        user.set_password(validated_data['password'])
        if(validated_data['referral_code'] != ''):
            user.referral_code = validated_data['referral_code']
            ca = ExtendedUser.objects.filter(invite_referral=validated_data['referral_code']).first()
            if(ca):
                user.referred_by = ca
                ca.ca_count += 1
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
        model = ExtendedUser
        fields = ['email',]

    def create(self, validated_data):
        if(ExtendedUser.objects.filter(email=validated_data['email']).first().ambassador == False):
            user = ExtendedUser.objects.filter(email=validated_data['email'])
            user.ambassador = True
            invite_referral = 'CA' + str(uuid.uuid4().int)[:6]
            user.invite_referral = invite_referral
            user.save()
            return user
        else:
            user = ExtendedUser.objects.filter(email=validated_data['email'])
            return user
        