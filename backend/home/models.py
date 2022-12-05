from django.db import models
from ckeditor.fields import RichTextField

THEME_CHOICES = (
    ('2030', '2030'),
    ('2040', '2040'),
    ('2050', '2050'),
)


class Carousel(models.Model):
    name = models.CharField(max_length=40, blank=True, null=True, verbose_name='Display Name')
    image = models.ImageField(upload_to='carousel_images/', verbose_name='Image to Display in Slide')
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Theme(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True, verbose_name="Display name")
    year = models.CharField(max_length=4,choices=THEME_CHOICES, verbose_name='Theme Year')
    description = RichTextField(max_length=5000000, null=True, blank=True, verbose_name="Description")
    
    def __int__(self):
        return self.name


class SponsorDesignation(models.Model):
    sponsor_type = models.CharField(max_length=100, verbose_name='Sponsor Type')
    rank = models.IntegerField(verbose_name='hierarchical position of the title')

    def __str__(self):
        return self.sponsor_type


class Sponsors(models.Model):
    designation = models.ForeignKey(SponsorDesignation, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='sponsors/', verbose_name='sponsors Logo')
    name = models.CharField(max_length=100, verbose_name='Sponsor name', null=True, blank=True)
    sponsor_link = models.URLField(max_length=1000, verbose_name='Link to Sponsors website', null=True, blank=True)

    class Meta:
        verbose_name_plural = 'sponsors'


class News(models.Model):
    title = models.CharField(max_length=100, verbose_name='News Title')
    description = RichTextField(max_length=5000000, null=True, blank=True, verbose_name="Description")
    image = models.ImageField(upload_to='news/', verbose_name='News Image')
    # link = models.URLField(max_length=1000, verbose_name='Link to News', null=True, blank=True)

    def __str__(self):
        return self.title