from django.contrib import admin
from .models import Event, Contacts, Brochure, Panel, EventSponsors, Gallery, StreamLinks
from users.models import *
from import_export.admin import ImportExportModelAdmin
from django.utils.translation import ugettext_lazy as _


class ContactsAdmin(admin.StackedInline):
    model = Contacts


class PanelAdmin(admin.StackedInline):
    model = Panel


class EventSponsorsAdmin(admin.StackedInline):
    model = EventSponsors


class EventAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('name', 'date', 'time', 'venue', 'registration_open', 'type')
    list_filter = ('type', 'registration_open')
    search_fields = ['name']
    inlines = [ContactsAdmin, PanelAdmin, EventSponsorsAdmin]
    fieldsets = (
        (_('Event Details'), {'fields': ('name', 'type', 'speaker', 'designation', 'description', 'prize', 'external_link', 'venue', 'featured', 'rank', 'hidden', 'submissions_started')}),
        (_('Event Registration Details'), {'fields': ('participation_type', 'min_team_size', 'max_team_size', 'registration_open', 'submission_link')}),
        (_('Event Dates'), {'fields': ('date', 'time', 'end_date', 'end_time', 'event_started')}),
        (_('Event Links'), {'fields': ('meet_link', 'youtube_link', 'webx_link')}),
        (_('Event Uploads'), {'fields': ('image', 'rulebook', 'material_name', 'material', 'problem_statement')}),
        (_('Poster Presentations'), {'fields': ('sample_poster', 'presentation_template', 'poster_description')}),
    )


class StreamLinksAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('name', 'url')
    list_filter = ('name', )


admin.site.register(Event, EventAdmin)
admin.site.register(StreamLinks, StreamLinksAdmin)


@admin.register(Brochure)
class BrochureAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ['name', 'type', ]
    search_fields = ['name', ]

    class Meta:
        model = Brochure
        fields = '__all__'


@admin.register(Gallery)
class GalleryAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ['name', 'hidden', ]
    list_filter = ('type', )
    search_fields = ['name', ]

    class Meta:
        model = Gallery
        fields = '__all__'



