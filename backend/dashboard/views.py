from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import user_passes_test
from django.views.decorators.csrf import csrf_exempt
from users.models import  ExtendedUser, Team, Submissions, CampusAmbassador
from events.models import Event
import xlsxwriter
import os
import pandas as pd
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.contrib import messages
from .forms import EmailForm
from django.http import HttpResponseRedirect, Http404, HttpResponse
from django.urls import reverse
from users.models import *

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
# from .serializers import *
from home.models import *
from events.models import *
from coordinator.models import *
from users.models import *
import requests
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
# from .serializers import MyTokenObtainPairSerializer
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


sendMailID = settings.FROM_EMAIL_USER
current_year_dict = {'1': '1st Year', '2': '2nd Year', '3': '3rd Year', '4': '4th Year', '5': '5th Year',
                     '6': 'Graduated', '7': 'Faculty/Staff', '8': 'NA'}




def get_all_event_participation():
    submissions = Submissions.objects.all().order_by('event')
    wbname2 = 'Event_Participants.xlsx'
    wbpath2 = os.path.join(settings.MEDIA_ROOT, os.path.join('workbooks', wbname2))
    workbook2 = xlsxwriter.Workbook(wbpath2)
    worksheet2 = workbook2.add_worksheet('Event_participants')
    col_center2 = workbook2.add_format({
        'align': 'center',
        'valign': 'vcenter',
    })
    worksheet2.set_column(0, 100, 30, col_center2)
    worksheet2.set_row(0, 30)
    merge_format2 = workbook2.add_format({
        'bold': 1,
        'border': 1,
        'align': 'center',
        'valign': 'vcenter',
        'bg_color': 'gray',
        'font_size': 20
    })
    header_format2 = workbook2.add_format({
        'bold': 1,
        'align': 'center',
        'valign': 'vcenter',
        'font_color': 'white',
        'bg_color': 'black'
    })
    worksheet2.merge_range('A1:D1', 'Event Participants', merge_format2)
    worksheet2.write(1, 0, "Email", header_format2)
    worksheet2.write(1, 1, "Name", header_format2)
    worksheet2.write(1, 2, "Team Name", header_format2)
    worksheet2.write(1, 3, "Contact", header_format2)
    worksheet2.write(1, 4, "Event", header_format2)
    worksheet2.write(1, 5, "College", header_format2)
    worksheet2.write(1, 6, "Submitted File Link", header_format2)
    row2 = 2
    for submission in submissions:
        if submission.event.participation_type == 'individual':
            worksheet2.write(row2, 0, submission.user.email)
            worksheet2.write(row2, 1, submission.user.first_name + ' ' + submission.user.last_name)
            worksheet2.write(row2, 2, 'NA')
            worksheet2.write(row2, 3, submission.user.contact)
            worksheet2.write(row2, 4, submission.event.name)
            worksheet2.write(row2, 5, submission.user.college)
            worksheet2.write(row2, 6, submission.file_url)
            row2 += 1
        else:
            for submitted_user in submission.user.teams.get(event=submission.event).members.all():
                worksheet2.write(row2, 0, submitted_user.email)
                worksheet2.write(row2, 1, submitted_user.first_name + ' ' + submitted_user.last_name)
                worksheet2.write(row2, 2, submission.user.teams.get(event=submission.event).name)
                worksheet2.write(row2, 3, submitted_user.contact)
                worksheet2.write(row2, 4, submission.event.name)
                worksheet2.write(row2, 5, submitted_user.college)
                worksheet2.write(row2, 6, submission.file_url)
                row2 += 1
    workbook2.close()


def get_submissions(event, filename):
    event = Event.objects.get(id=event)
    submissions = Submissions.objects.filter(event=event)
    wbname2 = filename + '.xlsx'
    wbpath2 = os.path.join(settings.MEDIA_ROOT, os.path.join('workbooks', wbname2))
    workbook2 = xlsxwriter.Workbook(wbpath2)
    if(len(event.name) > 18):
        worksheet2 = workbook2.add_worksheet(f'{event.name.capitalize()[:18]}_Submissions')
    else:
        worksheet2 = workbook2.add_worksheet(f'{event.name.capitalize()}_Submissions')
    col_center2 = workbook2.add_format({
        'align': 'center',
        'valign': 'vcenter',
    })
    worksheet2.set_column(0, 100, 30, col_center2)
    worksheet2.set_row(0, 30)
    merge_format2 = workbook2.add_format({
        'bold': 1,
        'border': 1,
        'align': 'center',
        'valign': 'vcenter',
        'bg_color': 'gray',
        'font_size': 20
    })
    header_format2 = workbook2.add_format({
        'bold': 1,
        'align': 'center',
        'valign': 'vcenter',
        'font_color': 'white',
        'bg_color': 'black'
    })
    if event.participation_type == 'individual':
        worksheet2.merge_range('A1:D1', f'{event.name.capitalize()}_Submissions', merge_format2)
        worksheet2.write(1, 0, "Email", header_format2)
        worksheet2.write(1, 1, "Name", header_format2)
        worksheet2.write(1, 2, "Contact", header_format2)
        worksheet2.write(1, 3, "College", header_format2)
        worksheet2.write(1, 4, "Submitted File Link", header_format2)
        row2 = 2
        for submission in submissions:
            worksheet2.write(row2, 0, submission.user.email)
            worksheet2.write(row2, 1, submission.user.first_name + ' ' + submission.user.last_name)
            worksheet2.write(row2, 2, submission.user.contact)
            worksheet2.write(row2, 3, submission.user.college)
            worksheet2.write(row2, 4, submission.file_url)
            row2 += 1
    else:
        worksheet2.merge_range('A1:E1', f'{event.name.capitalize()}_Submissions', merge_format2)
        worksheet2.write(1, 0, "Team Name", header_format2)
        worksheet2.write(1, 1, "Leader", header_format2)
        worksheet2.write(1, 2, "Leader Email", header_format2)
        worksheet2.write(1, 3, "Contact", header_format2)
        worksheet2.write(1, 4, "College", header_format2)
        worksheet2.write(1, 5, "Submitted File Link", header_format2)
        row2 = 2
        for submission in submissions:
            for team in submission.event.participating_teams.all():
                if submission.user in team.members.all():
                    worksheet2.write(row2, 0, team.name)
                    break
            worksheet2.write(row2, 1, submission.user.first_name + ' ' + submission.user.last_name)
            worksheet2.write(row2, 2, submission.user.email)
            worksheet2.write(row2, 3, submission.user.contact)
            worksheet2.write(row2, 4, submission.user.college)
            worksheet2.write(row2, 5, submission.file_url)
            row2 += 1
    workbook2.close()


@user_passes_test(lambda u: u.is_staff, login_url='/admin/login/?next=/dashboard/events/')
def update_event_state(request, type, eventid, redirect_url_name):
    updated_event = get_object_or_404(Event, pk=eventid)
    updated_event.event_started = not updated_event.event_started
    updated_event.save()
    return HttpResponseRedirect(reverse(redirect_url_name))


def get_ca_export(filename):
    users = ExtendedUser.objects.all()
    ca_referred_count = dict()
    for user in users:
        if user.ambassador:
            ca_referred_count[user.email] = 0
    for user in users:
        if user.referred_by:
            try:
                ca_referred_count[user.referred_by.email] += 1
            except KeyError:
                ca_referred_count[user.referred_by.email] = 0
    wbname = filename
    wbpath = os.path.join(settings.MEDIA_ROOT, os.path.join('workbooks', wbname))
    workbook = xlsxwriter.Workbook(wbpath)
    ca_list = ExtendedUser.objects.filter(ambassador=True)
    worksheet = workbook.add_worksheet('CA List')
    col_center = workbook.add_format({
        'align': 'center',
        'valign': 'vcenter',
    })
    worksheet.set_column(0, 100, 30, col_center)
    worksheet.set_row(0, 30)
    merge_format = workbook.add_format({
        'bold': 1,
        'border': 1,
        'align': 'center',
        'valign': 'vcenter',
        'bg_color': 'gray',
        'font_size': 20
    })
    header_format = workbook.add_format({
        'bold': 1,
        'align': 'center',
        'valign': 'vcenter',
        'font_color': 'white',
        'bg_color': 'black'
    })
    row = 2
    worksheet.merge_range('A1:H1', 'Campus Ambassadors', merge_format)
    worksheet.write(1, 0, "Email", header_format)
    worksheet.write(1, 1, "Name", header_format)
    worksheet.write(1, 2, "Referral Id", header_format)
    worksheet.write(1, 3, "No of referred users", header_format)
    worksheet.write(1, 4, "Contact", header_format)
    worksheet.write(1, 5, "College", header_format)
    worksheet.write(1, 6, "Gender", header_format)
    worksheet.write(1, 7, "City", header_format)
    for ca in ca_list:
        if 'iitj' not in ca.college.lower() and 'iit jodhpur' not in ca.college.lower() and 'indian institute of technology jodhpur' not in ca.college.lower() and 'indian institute of technology, jodhpur' not in ca.college.lower():
            worksheet.write(row, 0, ca.email)
            worksheet.write(row, 1, ca.first_name + ' ' + ca.last_name)
            worksheet.write(row, 2, ca.invite_referral)
            worksheet.write(row, 3, ca_referred_count[ca.email])
            worksheet.write(row, 4, ca.contact)
            worksheet.write(row, 5, ca.college)
            worksheet.write(row, 6, ca.gender)
            worksheet.write(row, 7, ca.city)
            row += 1
    workbook.close()


def get_all_user_export(filename):
    users = ExtendedUser.objects.all()
    wbname2 = filename
    wbpath2 = os.path.join(settings.MEDIA_ROOT, os.path.join('workbooks', wbname2))
    workbook2 = xlsxwriter.Workbook(wbpath2)
    worksheet2 = workbook2.add_worksheet('Users List')
    col_center2 = workbook2.add_format({
        'align': 'center',
        'valign': 'vcenter',
    })
    worksheet2.set_column(0, 100, 30, col_center2)
    worksheet2.set_row(0, 30)
    merge_format2 = workbook2.add_format({
        'bold': 1,
        'border': 1,
        'align': 'center',
        'valign': 'vcenter',
        'bg_color': 'gray',
        'font_size': 20
    })
    header_format2 = workbook2.add_format({
        'bold': 1,
        'align': 'center',
        'valign': 'vcenter',
        'font_color': 'white',
        'bg_color': 'black'
    })
    worksheet2.merge_range('A1:J1', 'User List', merge_format2)
    worksheet2.write(1, 0, "Email", header_format2)
    worksheet2.write(1, 1, "Name", header_format2)
    worksheet2.write(1, 2, "Contact", header_format2)
    worksheet2.write(1, 3, "Referred By", header_format2)
    worksheet2.write(1, 4, "Campus Ambassador", header_format2)
    worksheet2.write(1, 5, "College", header_format2)
    worksheet2.write(1, 6, "Current Year", header_format2)
    worksheet2.write(1, 7, "Gender", header_format2)
    worksheet2.write(1, 8, "Accomodation", header_format2)
    worksheet2.write(1, 9, "Registration ID", header_format2)

    row2 = 2

    for user in users:
        worksheet2.write(row2, 0, user.email)
        worksheet2.write(row2, 1, user.first_name + ' ' + user.last_name)
        worksheet2.write(row2, 2, user.contact)
        worksheet2.write(row2, 3, str(user.referred_by)) if user.referred_by is not None else worksheet2.write(row2, 3, 'NA')
        worksheet2.write(row2, 4, 'YES') if user.ambassador else worksheet2.write(row2, 4, 'NO')
        worksheet2.write(row2, 5, user.college)
        worksheet2.write(row2, 6, current_year_dict[user.current_year])
        worksheet2.write(row2, 7, user.gender)
        worksheet2.write(row2, 8, 'YES') if user.accomodation else worksheet2.write(row2, 8, 'NO')
        worksheet2.write(row2, 9, user.registration_id)
        row2 += 1
    workbook2.close()


@user_passes_test(lambda u: u.is_staff, login_url='/admin/login/?next=/dashboard/')
def downloadfile(request, filename):
    file_path = os.path.join(settings.MEDIA_ROOT, os.path.join('workbooks', filename))
    if filename == "User_List":
        get_all_user_export(filename + '.xlsx')
    elif filename == "Campus_Ambassador_List":
        get_ca_export(filename + '.xlsx')
    elif 'Submissions' in filename:
        event_name_list = list(filename.split('_'))[:-1]
        event_id = event_name_list[0]
        get_submissions(event_id, filename)
    elif 'Event_Participants' in filename:
        get_all_event_participation()
    file_path += '.xlsx'
    if os.path.exists(file_path):
        with open(file_path, 'rb') as fh:
            response = HttpResponse(fh.read(), content_type="application/vnd.ms-excel")
            response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
            return response
    raise Http404


@user_passes_test(lambda u: u.is_staff, login_url='/admin/login/?next=/dashboard/users/')
def users_info(request):
    users = ExtendedUser.objects.all()
    wbname = 'User_List'
    wbname2 = 'Campus_Ambassador_List'
    return render(request, 'dashboard/users_info.html', {'users': users, 'wbname': wbname, 'wbname2': wbname2})

def dashboard(request):
    return redirect(users_info)

@user_passes_test(lambda u: u.is_staff, login_url='/admin/login/?next=/dashboard/users/')
def user_info(request, userid):
    user = get_object_or_404(ExtendedUser, pk=userid)
    teams = {}
    for team in user.teams.all():
        teams[team.event.pk] = team.name
    return render(request, 'dashboard/user_info.html', {'cur_user': user, 'teams': teams})

@user_passes_test(lambda u: u.is_staff, login_url='/admin/login/?next=/dashboard/ca/')
def ca_info(request):
    CAs = CampusAmbassador.objects.all()
    # CAs = ExtendedUser.objects.filter(ambassador=True).all()
    wbname = 'User_List'
    wbname2 = 'Campus_Ambassador_List'
    return render(request, 'dashboard/ca_info.html', {'CAs': CAs, 'wbname': wbname, 'wbname2': wbname2})

@user_passes_test(lambda u: u.is_staff, login_url='/admin/login/?next=/dashboard/users/')
def ca_dashboard(request, caid):
    ca = get_object_or_404(CampusAmbassador, pk=caid)
    # email = ca.email
    user = ExtendedUser.objects.filter(email=ca.email).first()

    invite_referral = ca.invite_referral
    count = ca.ca_count
    referred_users = ExtendedUser.objects.filter(referred_by=user).all()
    return render(request, 'dashboard/ca_dashboard.html', {'cur_user': user, 'cur_ca': ca, 'referred_users': referred_users, 'invite_referral': invite_referral, 'count':count})



@user_passes_test(lambda u: u.is_staff, login_url='/admin/login/?next=/dashboard/events/')
def events_info(request):
    events = Event.objects.all()
    return render(request, 'dashboard/events_info.html', {'events': events})


@user_passes_test(lambda u: u.is_staff, login_url='/admin/login/?next=/dashboard/events/')
def event_type_info(request, type):
    events = Event.objects.filter(type=type).all()
    wbname = f'Events ({type}) Participation List.xlsx'
    wbpath = os.path.join(settings.MEDIA_ROOT, os.path.join('workbooks', wbname))
    workbook = xlsxwriter.Workbook(wbpath)
    wbname2 = f'Events ({type}) Eligible Participants List.xlsx'
    wbpath2 = os.path.join(settings.MEDIA_ROOT, os.path.join('workbooks', wbname2))
    workbook2 = xlsxwriter.Workbook(wbpath2)
    for event in events:
        participants = ExtendedUser.objects.filter(events=event)
        participating_teams = Team.objects.filter(event=event)
        e_name = ''.join(e for e in event.name if e.isalnum())
        if(len(e_name) > 31):
            worksheet = workbook.add_worksheet(e_name[:31])
            worksheet2 = workbook2.add_worksheet(e_name[:31])
        else:
            worksheet = workbook.add_worksheet(e_name)
            worksheet2 = workbook2.add_worksheet(e_name)
        col_center = workbook.add_format({
            'align': 'center',
            'valign': 'vcenter',
        })
        col_center2 = workbook2.add_format({
            'align': 'center',
            'valign': 'vcenter',
        })
        worksheet.set_column(0, 100, 30, col_center)
        worksheet.set_row(0, 30)
        worksheet2.set_column(0, 100, 30, col_center2)
        worksheet2.set_row(0, 30)
        merge_format = workbook.add_format({
            'bold': 1,
            'border': 1,
            'align': 'center',
            'valign': 'vcenter',
            'bg_color': 'gray',
            'font_size': 20
        })
        merge_format2 = workbook2.add_format({
            'bold': 1,
            'border': 1,
            'align': 'center',
            'valign': 'vcenter',
            'bg_color': 'gray',
            'font_size': 20
        })
        header_format = workbook.add_format({
            'bold': 1,
            'align': 'center',
            'valign': 'vcenter',
            'font_color': 'white',
            'bg_color': 'black'
        })
        invalid_format = workbook.add_format({
            'bg_color': '#ff7f7f',
            'align': 'center',
            'valign': 'vcenter',
        })
        header_format2 = workbook2.add_format({
            'bold': 1,
            'align': 'center',
            'valign': 'vcenter',
            'font_color': 'white',
            'bg_color': 'black'
        })
        light_format = workbook.add_format({
            'bg_color': '#d3d3d3',
            'align': 'center',
            'valign': 'vcenter',
        })
        light_format2 = workbook2.add_format({
            'bg_color': '#d3d3d3',
            'align': 'center',
            'valign': 'vcenter',
        })
        if (event.participation_type == 'individual'):
            worksheet.merge_range('A1:H1', event.name + ' - Participants', merge_format)
            worksheet.write(1, 0, "Email", header_format)
            worksheet.write(1, 1, "First Name", header_format)
            worksheet.write(1, 2, "Last Name", header_format)
            worksheet.write(1, 3, "Contact", header_format)
            worksheet.write(1, 4, "Current Year", header_format)
            worksheet.write(1, 5, "College", header_format)
            worksheet.write(1, 6, "City", header_format)
            worksheet.write(1, 7, "Gender", header_format)
            row = 2
            for participant in participants:
                worksheet.write(row, 0, participant.email)
                worksheet.write(row, 1, participant.first_name)
                worksheet.write(row, 2, participant.last_name)
                worksheet.write(row, 3, participant.contact)
                worksheet.write(row, 4, current_year_dict[participant.current_year].capitalize())
                worksheet.write(row, 5, participant.college)
                worksheet.write(row, 6, participant.city)
                worksheet.write(row, 7, participant.gender.capitalize())
                if(row % 2):
                    worksheet.set_row(row, cell_format=light_format)
                row = row + 1
        else:
            worksheet.merge_range('A1:' + str(chr(event.max_team_size+68))+'1', event.name + ' - Participanting Teams', merge_format)
            worksheet2.merge_range('A1:' + str(chr(event.max_team_size+68))+'1', event.name + ' - Participanting Teams', merge_format2)
            worksheet.write(1, 0, "Team ID", header_format)
            worksheet2.write(1, 0, "Team ID", header_format2)
            worksheet.write(1, 1, "Team Name", header_format)
            worksheet2.write(1, 1, "Team Name", header_format2)
            for i in range(1, event.max_team_size+1):
                worksheet.write(1, i+1, "Member " + str(i), header_format)
                worksheet2.write(1, i+1, "Member " + str(i), header_format2)
            worksheet.write(1, event.max_team_size+2, "Created By", header_format)
            worksheet2.write(1, event.max_team_size+2, "Created By", header_format2)
            worksheet.write(1, event.max_team_size+3, "Status", header_format)
            worksheet2.write(1, event.max_team_size+3, "Status", header_format2)
            row = 2
            row2 = 2
            for team in participating_teams:
                if(row % 2):
                    worksheet.set_row(row, cell_format=light_format)
                    worksheet2.set_row(row2, cell_format=light_format2)
                worksheet.write(row, 0, team.pk)
                worksheet.write(row, 1, team.name)
                i = 2
                for member in team.members.all():
                    worksheet.write(row, i, member.first_name + ' ' + member.last_name + f' ({member.email}, {member.contact})')
                    i = i + 1
                worksheet.write(row, event.max_team_size+2, team.leader.first_name + team.leader.last_name + f' ({team.leader.email})')
                if (team.members.all().count() < event.min_team_size or team.members.all().count() > event.max_team_size):
                    worksheet.write(row, event.max_team_size+3, "INELIGIBLE")
                    worksheet.set_row(row, cell_format=invalid_format)
                else:
                    worksheet.write(row, event.max_team_size+3, "ELIGIBLE")
                    worksheet2.write(row2, 0, team.pk)
                    worksheet2.write(row2, 1, team.name)
                    i2 = 2
                    for member in team.members.all():
                        worksheet2.write(row2, i2, member.first_name + ' ' + member.last_name + f' ({member.email}, {member.contact})')
                        i2 = i2 + 1
                    worksheet2.write(row2, event.max_team_size+2, team.leader.first_name + team.leader.last_name + f' ({team.leader.email})')
                    worksheet2.write(row2, event.max_team_size+3, "ELIGIBLE")
                    row2 += 1
                row = row + 1
    workbook.close()
    workbook2.close()
    return render(request, 'dashboard/event_type_info.html', {'events': events, 'type': type, 'wbname': wbname, 'wbname2': wbname2})


@user_passes_test(lambda u: u.is_staff, login_url='/admin/login/?next=/dashboard/events/')
def event_info(request, type, eventid):
    event = get_object_or_404(Event, pk=eventid)
    e_name = ''.join(e for e in event.name if e.isalnum())
    wbname = f'{e_name} Participation List.xlsx'
    wbpath = os.path.join(settings.MEDIA_ROOT, os.path.join('workbooks', wbname))
    workbook = xlsxwriter.Workbook(wbpath)
    wbname2 = f'{e_name} Eligible Participants List.xlsx'
    wbpath2 = os.path.join(settings.MEDIA_ROOT, os.path.join('workbooks', wbname2))
    workbook2 = xlsxwriter.Workbook(wbpath2)
    if(len(event.name) > 31):
        worksheet = workbook.add_worksheet(e_name[:31])
        worksheet2 = workbook2.add_worksheet(e_name[:31])
    else:
        worksheet = workbook.add_worksheet(e_name)
        worksheet2 = workbook2.add_worksheet(e_name)
    col_center = workbook.add_format({
        'align': 'center',
        'valign': 'vcenter',
    })
    col_center2 = workbook2.add_format({
        'align': 'center',
        'valign': 'vcenter',
    })
    worksheet.set_column(0, 100, 30, col_center)
    worksheet.set_row(0, 30)
    worksheet2.set_column(0, 100, 30, col_center2)
    worksheet2.set_row(0, 30)
    merge_format = workbook.add_format({
        'bold': 1,
        'border': 1,
        'align': 'center',
        'valign': 'vcenter',
        'bg_color': 'gray',
        'font_size': 20
    })
    merge_format2 = workbook2.add_format({
        'bold': 1,
        'border': 1,
        'align': 'center',
        'valign': 'vcenter',
        'bg_color': 'gray',
        'font_size': 20
    })
    header_format = workbook.add_format({
        'bold': 1,
        'align': 'center',
        'valign': 'vcenter',
        'font_color': 'white',
        'bg_color': 'black'
    })
    header_format2 = workbook2.add_format({
        'bold': 1,
        'align': 'center',
        'valign': 'vcenter',
        'font_color': 'white',
        'bg_color': 'black'
    })
    invalid_format = workbook.add_format({
        'bg_color': '#ff7f7f',
        'align': 'center',
        'valign': 'vcenter',
    })
    light_format = workbook.add_format({
        'bg_color': '#d3d3d3',
        'align': 'center',
        'valign': 'vcenter',
    })
    light_format2 = workbook2.add_format({
        'bg_color': '#d3d3d3',
        'align': 'center',
        'valign': 'vcenter',
    })
    if (event.participation_type == 'individual'):
        worksheet.merge_range('A1:H1', event.name + ' - Participants', merge_format)
        worksheet.write(1, 0, "Email", header_format)
        worksheet.write(1, 1, "First Name", header_format)
        worksheet.write(1, 2, "Last Name", header_format)
        worksheet.write(1, 3, "Contact", header_format)
        worksheet.write(1, 4, "Current Year", header_format)
        worksheet.write(1, 5, "College", header_format)
        worksheet.write(1, 6, "City", header_format)
        worksheet.write(1, 7, "Gender", header_format)
        row = 2
        for participant in event.participants.all():
            worksheet.write(row, 0, participant.email)
            worksheet.write(row, 1, participant.first_name)
            worksheet.write(row, 2, participant.last_name)
            worksheet.write(row, 3, participant.contact)
            worksheet.write(row, 4, current_year_dict[participant.current_year].capitalize())
            worksheet.write(row, 5, participant.college)
            worksheet.write(row, 6, participant.city)
            worksheet.write(row, 7, participant.gender.capitalize())
            if(row % 2):
                worksheet.set_row(row, cell_format=light_format)
            row = row + 1
    else:
        worksheet.merge_range('A1:' + str(chr(event.max_team_size+68))+'1', event.name + ' - Participanting Teams', merge_format)
        worksheet.write(1, 0, "Team ID", header_format)
        worksheet.write(1, 1, "Team Name", header_format)
        worksheet2.merge_range('A1:' + str(chr(event.max_team_size+68))+'1', event.name + ' - Participanting Teams', merge_format2)
        worksheet2.write(1, 0, "Team ID", header_format2)
        worksheet2.write(1, 1, "Team Name", header_format2)
        for i in range(1, event.max_team_size+1):
            worksheet.write(1, i+1, "Member " + str(i), header_format)
            worksheet2.write(1, i+1, "Member " + str(i), header_format2)
        worksheet.write(1, event.max_team_size+2, "Created By", header_format)
        worksheet.write(1, event.max_team_size+3, "Status", header_format)
        worksheet2.write(1, event.max_team_size+2, "Created By", header_format2)
        worksheet2.write(1, event.max_team_size+3, "Status", header_format2)
        row = 2
        row2 = 2
        for team in event.participating_teams.all():
            if(row % 2):
                worksheet.set_row(row, cell_format=light_format)
                worksheet2.set_row(row2, cell_format=light_format2)
            worksheet.write(row, 0, team.pk)
            worksheet.write(row, 1, team.name)
            i = 2
            for member in team.members.all():
                worksheet.write(row, i, f' ({member.email}, {member.contact})')
                i = i + 1
            worksheet.write(row, event.max_team_size+2, f'{team.leader.first_name} {team.leader.last_name}' + f' ({team.leader.email})')
            if (team.members.all().count() < event.min_team_size or team.members.all().count() > event.max_team_size):
                worksheet.write(row, event.max_team_size+3, "INELIGIBLE")
                worksheet.set_row(row, cell_format=invalid_format)
            else:
                worksheet.write(row, event.max_team_size+3, "ELIGIBLE")
                worksheet2.write(row2, event.max_team_size+3, "ELIGIBLE")
                worksheet2.write(row2, 0, team.pk)
                worksheet2.write(row2, 1, team.name)
                i2 = 2
                for member in team.members.all():
                    worksheet2.write(row2, i2, f' ({member.email}, {member.contact})')
                    i2 = i2 + 1
                worksheet2.write(row2, event.max_team_size+2, f'{team.leader.first_name} {team.leader.last_name}' + f' ({team.leader.email})')
                row2 = row2 + 1
            row = row + 1
    workbook.close()
    workbook2.close()
    event_name = str(event.id)
    wbname3 = f'{event_name}_Submissions'
    return render(request, 'dashboard/event_info.html', {'event': event, 'wbname': wbname, 'wbname2': wbname2, 'wbname3': wbname3})


@user_passes_test(lambda u: u.is_staff, login_url='/admin/login/?next=/dashboard/mass_mail/')
def mass_mail(request):
    # technical = Event.objects.filter(type='technical')
    # informal = Event.objects.filter(type='informal')
    # workshop = Event.objects.filter(type='workshop')
    # events = Event.objects.all()
    if (request.method == 'POST'):
        form = EmailForm(request.POST, request.FILES)
        if(form.is_valid()):
            recepients = [settings.EVENTS_MAIL_RECEPIENTS]   # add your required mail
            bcc = []
            iitj = request.POST.get('iitj')
            for event in form.cleaned_data['events']:
                users = ExtendedUser.objects.all()
                for participant in users:
                    if event in participant.events.all():
                        if(participant.user.email not in recepients):
                            if iitj:
                                bcc.append(participant.user.email)
                            else:
                                if 'iitj.ac.in' not in participant.user.email:
                                    bcc.append(participant.user.email)

            sender = sendMailID
            email = EmailMultiAlternatives(form.cleaned_data['subject'], form.cleaned_data['message'], sender, recepients, bcc=bcc, reply_to=('prometeo@iitj.ac.in', ))
            for file in request.FILES.getlist('attachments'):
                email.attach(file.name, file.read(), file.content_type)
            email.send()
            messages.success(request, "Mails sent!")
            return redirect('mass_mail')
        # recepients = []
        # for event in events:
        #     if(request.POST.get('check'+str(event.pk))):
        #         for participant in event.participants.all():
        #             if(participant.email not in recepients):
        #                 recepients.append(participant.email)
        # subject = request.POST.get('subject')
        # message = request.POST.get('message')
        # print(recepients)
        # send_mail(
        #     subject,
        #     message,
        #     "info.noreply@prometeo.in",
        #     recepients,
        #     fail_silently=False
        # )
        # messages.success(request, "Mails sent!")
        # return redirect('mass_mail')
    else:
        form = EmailForm()
    return render(request, 'dashboard/mass_mail.html', {'form': form})


@user_passes_test(lambda u: u.is_staff, login_url='/admin/login/?next=/dashboard/events/')
def change_registration(request, type, eventid, value):
    event = get_object_or_404(Event, pk=eventid)
    if(value == 'open'):
        event.registration_open = True
        messages.success(request, 'Successfully opened registration for event ' + event.name + '.')
    else:
        event.registration_open = False
        messages.success(request, 'Successfully closed registration for event ' + event.name + '.')
    event.save()
    return redirect('event_info', type, eventid)


# dashboard page for preregistration

@user_passes_test(lambda u: u.is_staff, login_url='/admin/login/?next=/dashboard/preregistration/')
def preregistration_page(request):
    preregistrations = PreRegistration.objects.all()
    return render(request, 'dashboard/preregistration.html', {'Preregistrations': preregistrations})



@user_passes_test(lambda u: u.is_staff, login_url='/admin/login/?next=/dashboard/passtype/')
def passtype_page(request):
    passtypes = Passes.objects.all()
    return render(request, 'dashboard/passtype.html', {'passtypes': passtypes})

class change_passtype(APIView):
    def post(self, request):
        print(request.data)
        usere = request.data['email']
        changed = request.data['passType']
        myusr = ExtendedUser.objects.filter(email=usere).first()
        req = Passes.objects.filter(user=myusr).first()
        req.pass_type = changed
        req.save()
        passtypes = Passes.objects.all()
        return render(request, 'dashboard/passtype.html', {'passtypes': passtypes})



@user_passes_test(lambda u: u.is_staff, login_url='/admin/login/?next=/dashboard/passtype/')
def get_pass_excel(request):
    passtypes = Passes.objects.all()
    # wbpath = os.path.join(settings.MEDIA_ROOT, os.path.join('passes.xlsx'))
    workbook = xlsxwriter.Workbook('passes.xlsx')
    worksheet = workbook.add_worksheet()
    worksheet.write(0, 0, "Name")
    worksheet.write(0, 1, "Email")
    worksheet.write(0, 2, "Pass Type")
    worksheet.write(0, 3, "Aadhar Number")
    worksheet.write(0, 4, "Date of Birth")
    worksheet.write(0, 5,"Address")
    row = 1
    for passtype in passtypes:
        worksheet.write(row, 0, passtype.full_name)
        worksheet.write(row, 1, passtype.user.email)
        worksheet.write(row, 2, passtype.pass_type)
        worksheet.write(row, 3, passtype.aadhar_card)
        worksheet.write(row, 4, passtype.dob)
        worksheet.write(row, 5, passtype.address)
        row = row + 1
    workbook.close()
    file_path = os.path.join('passes.xlsx')
    with open(file_path, 'rb') as fh:
            response = HttpResponse(fh.read(), content_type="application/vnd.ms-excel")
            response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
            return response
    # return render(request, 'dashboard/passtype.html', {'passtypes': passtypes})

@user_passes_test(lambda u: u.is_staff, login_url='/admin/login/?next=/dashboard/passtype/')
def passtype_update(request):
    passtypes = Passes.objects.all()
    if request.method=='POST':
        file = request.FILES['myfile']
        excel_data = pd.read_excel(file)
        data = pd.DataFrame(excel_data, columns=['Full Name (same as Aadhaar card)','Type of payment'])
        data_fullName = pd.DataFrame(excel_data, columns=['Full Name (same as Aadhaar card)'])
        
        # print(len(data_fullName))
        list_fullName=[]
        list_typeofpayment=[]
        list_passtype=[]
        for ind in data.index:
            list_fullName.append(data['Full Name (same as Aadhaar card)'][ind])
            list_typeofpayment.append(data['Type of payment'][ind])
        print(list_fullName)
        print(list_typeofpayment)
        for i in range(0,len(list_typeofpayment)):
            if "Jumbo Fee" in list_typeofpayment[i]:
                # list_passtype[i]=3
                list_passtype.append(3)
            elif "Cultural Night Pass" in list_typeofpayment[i]:
                # list_passtype[i]=2
                list_passtype.append(2)
            elif "Accommodation Pass" in list_typeofpayment[i]:
                # list_passtype[i]=1
                list_passtype.append(1)

        print(list_passtype)
        conflict=[]
        for i in range(0,len(list_fullName)):
            if Passes.objects.filter(full_name=list_fullName[i]).exists():
                pass_update = Passes.objects.filter(full_name=list_fullName[i]).first()
                if pass_update.pass_type==0:
                    pass_update.pass_type = list_passtype[i]
                    pass_update.save()
                elif pass_update.pass_type !=0 and pass_update.pass_type != list_passtype[i]:
                    conflict.append(list_fullName[i])
                print(pass_update.pass_type)
                print(conflict)

    return render(request, 'dashboard/passtype.html', {'passtypes': passtypes,'conflict': conflict})


