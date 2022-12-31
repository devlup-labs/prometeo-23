from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.utils.translation import ugettext_lazy as _
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import *


# @admin.register(ExtendedUser)
# class ExtendedUserAdmin(admin.ModelAdmin):
#     list_display = ('user', 'first_name', 'last_name', 'college', 'ambassador')
#     list_filter = ('ambassador', 'college')
#     search_fields = ['user__email', 'user__first_name', 'user__last_name', 'college', 'contact', 'city']

#     class Meta:
#         model = ExtendedUser
#         fields = '__all__'


class PreRegistrationAdminResource(resources.ModelResource):

    class Meta:
        model   =   PreRegistration
        import_id_fields = ('email',)


@admin.register(ExtendedUser)
class UserAdmin(ImportExportModelAdmin, DjangoUserAdmin):
    """Define admin model for custom User model with no email field."""

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
        (_('Profile'), {'fields': ('college', 'contact', 'city','isProfileCompleted' )}),
        (_('Ambassador'), {'fields': ('ambassador', 'referred_by','invite_referral' )}),
        # (_('drone race'), {'fields':('drone_wars_name',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    # list_display = ('email', 'first_name', 'last_name', 'is_staff')
    # search_fields = ('email', 'first_name', 'last_name')
    # ordering = ('email',)
    list_display = ('email','first_name', 'last_name', 'college', 'ambassador')
    list_filter = ('ambassador', 'college')
    search_fields = ['email', 'first_name', 'last_name', 'college', 'contact', 'city']
    ordering = ('email',)

    class Meta:
        model = ExtendedUser
        fields = '__all__'


class TeamAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('name', 'leader', 'event')
    list_filter = ('event',)
    search_fields = ['name', 'leader__email', ]


class SubmissionsAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('user', 'event', 'file_url')
    list_filter = ('event',)


class preregisterAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class  =   PreRegistrationAdminResource
    list_display = ('name', 'email', 'contact', 'college')
    list_filter = ('college',)

class CampusAmbassadorAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('email','invite_referral','ca_count')
    # list_filter = ('college',)
    search_fields = [ 'email',]

class PassesAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('user', 'dob','address','aadhar_card','full_name','pass_type',)
    list_filter = ('user',)

# @admin.register(RoboWars)
class RoboWarsAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ['rw_name','bot_name','rw_category','rw_leader','get_members']
    list_filter = ('rw_category', )
    search_fields = ['rw_name', ]

    def get_members(self, obj):
        return "\n".join([p.email for p in obj.rw_members.all()])
    # class Meta:
    #     model = RoboWars
    #     fields = '__all__'


# admin.site.unregister(RoboWars)
admin.site.register(RoboWars, RoboWarsAdmin)
admin.site.register(Team, TeamAdmin)
admin.site.register(Submissions, SubmissionsAdmin)
admin.site.register(PreRegistration,preregisterAdmin)
admin.site.register(CampusAmbassador, CampusAmbassadorAdmin)
admin.site.register(Passes, PassesAdmin)
# admin.site.register(RoboWars)