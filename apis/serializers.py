from rest_framework import serializers
from home.models import *
from events.models import *
from coordinator.models import *
from users.models import *

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

class SubmissionsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Submissions
        fields = '__all__'

class CustomUserSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

class ExtendedUserSerializers(serializers.ModelSerializer):
    class Meta:
        model = ExtendedUser
        fields = '__all__'