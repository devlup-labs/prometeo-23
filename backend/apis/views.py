from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import viewsets
from rest_framework import generics
from .serializers import *
from home.models import *
from events.models import *
from coordinator.models import *
from users.models import *

class SponsorsViewSet(viewsets.ModelViewSet):
    queryset = Sponsors.objects.all()
    serializer_class = SponsorsSerializers

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['type']

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

class SubmissionsViewSet(viewsets.ModelViewSet):
    queryset = Submissions.objects.all()
    serializer_class = SubmissionsSerializers

# class CustomUserViewSet(viewsets.ModelViewSet):
#     queryset = ExtendedUser.objects.all()
#     serializer_class = CustomUserSerializers

class ExtendedUserViewSet(viewsets.ModelViewSet):
    queryset = ExtendedUser.objects.all()
    serializer_class = ExtendedUserSerializers
    
class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializers


# Create your views here.
