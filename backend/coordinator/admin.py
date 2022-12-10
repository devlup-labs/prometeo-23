from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import Designation, Coordinator


@admin.register(Coordinator)
class CoordinatorAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ['name', 'team', 'email', 'phoneNo']

    class Meta:
        model = Coordinator
        fields = '__all__'


@admin.register(Designation)
class DesignationAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ['designationName', ]

    class Meta:
        model = Designation
        fields = '__all__'
