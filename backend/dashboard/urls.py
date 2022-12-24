from django.urls import path
from .views import user_info, change_registration, update_event_state, event_info, downloadfile, event_type_info, events_info, users_info, mass_mail, dashboard, ca_info, ca_dashboard , preregistration_page
from apis.views import CampusAmbassadorListView


# app_name = 'dashboard'
urlpatterns = [
    path('', dashboard, name='dashboard'),
    path('users/<int:userid>/', user_info, name='user_info'),
    path('users/', users_info, name='users_info'),
    path('downloadfile/<slug:filename>/', downloadfile, name='downloadfile'),
    path('updateevents/<slug:type>/<int:eventid>/<slug:redirect_url_name>/', update_event_state, name='update_event_state'),
    path('events/', events_info, name='events_info'),
    path('events/<slug:type>/', event_type_info, name='event_type_info'),
    path('events/<slug:type>/<int:eventid>/', event_info, name='event_info'),
    path('events/<slug:type>/<int:eventid>/change_registration/<slug:value>/', change_registration, name="change_registration"),
    # path('ca/', CampusAmbassadorListView.as_view(), name='CampusAmbassadorListView'),
    path('ca/', ca_info, name='ca_info'),
    path('ca/<int:caid>/', ca_dashboard, name='ca_dashboard'),
    path('preregistration/', preregistration_page , name='pre_registration')
]
