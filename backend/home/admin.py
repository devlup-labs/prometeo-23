from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import Carousel, Theme, Sponsors, SponsorDesignation


@admin.register(Carousel)
class CarouselAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ['id', 'name', 'active', ]
    list_filter = ['active', ]

    class Meta:
        model = Carousel
        fields = '__all__'


@admin.register(Theme)
class ThemeAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ['id', 'name' ]

    class Meta:
        model = Theme
        fields = '__all__'


class SponsorsAdmin(admin.StackedInline):
    model = Sponsors


class SponsorsDesignationAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    model = SponsorDesignation
    list_display = ['sponsor_type']
    inlines = [SponsorsAdmin, ]

    class Meta:
        model = Sponsors
        fields = '__all__'


admin.site.register(SponsorDesignation, SponsorsDesignationAdmin)
