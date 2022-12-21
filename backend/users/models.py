# import jwt
from datetime import datetime, timedelta
from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser
from events.models import Event
from django.db.models.signals import post_save
from django.dispatch import receiver
from .manager import UserManager


GENDER_CHOICES = (
    ('Male', 'Male'),
    ('Female', 'Female'),
    ('NotSay', 'NotSay'),
    ('Other', 'Other'),
)

YEAR_CHOICES = (
    ('1', '1st Year'),
    ('2', '2nd Year'),
    ('3', '3rd Year'),
    ('4', '4th Year'),
    ('5', '5th Year'),
    ('6', 'Graduated'),
    ('7', 'Faculty/Staff'),
    ('8', 'NA'),
)


# class CustomUser(AbstractUser):
#     username = None
#     email = models.EmailField(unique=True)
#     USERNAME_FIELD = 'email'
#     objects = UserManager()
#     REQUIRED_FIELDS = []

#     def __str__(self):
#         return self.email


class ExtendedUser(AbstractUser):
    username = None
    email = models.EmailField(unique=True, blank=False, null=False, verbose_name='Email',default='testing_email')
    USERNAME_FIELD = 'email'
    # to implement CA
    # user = models.OneToOneField('self', on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100, default='fname')
    last_name = models.CharField(max_length=100, default='lname')
    events = models.ManyToManyField(Event, blank=True, related_name="participants")
    # referred_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='referred_users', null=True, blank=True)
    referred_by = models.ForeignKey('self', on_delete=models.CASCADE, related_name='referred_users', null=True, blank=True)
    invite_referral = models.CharField(max_length=8, unique=True, null=True, blank=True, verbose_name='Referral Code for Inviting')
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, verbose_name='Gender', default='Male')
    contact = models.CharField(max_length=10, verbose_name='Contact')
    current_year = models.CharField(max_length=20, choices=YEAR_CHOICES, verbose_name='Current Year of Study', default='1')
    college = models.CharField(max_length=60, verbose_name='College Name')
    city = models.CharField(max_length=40, verbose_name='City')
    ambassador = models.BooleanField(verbose_name='Campus Ambassador', default=False, blank=True)
    accomodation = models.BooleanField(verbose_name='Accomodation', default=False, blank=True)
    isProfileCompleted = models.BooleanField(verbose_name='Is Profile Completed', default=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True,blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    pass_type = models.IntegerField(default=0)
    secondary_email = models.EmailField(blank=True, null=True, verbose_name='Secondary Email')
    referral_code = models.CharField(max_length=8, null=True, blank=True, verbose_name='Referral Code')
    ca_count = models.IntegerField(default=0)
    registration_id = models.CharField(max_length=9, unique=True, null=True, blank=True, verbose_name='Registration ID') 
    objects = UserManager()
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    # @property
    # def token(self):
    #     """
    #     Allows us to get a user's token by calling `user.token` instead of
    #     `user.generate_jwt_token().

    #     The `@property` decorator above makes this possible. `token` is called
    #     a "dynamic property".
    #     """
    #     return self._generate_jwt_token()

    # def get_full_name(self):
    #     """
    #     This method is required by Django for things like handling emails.
    #     Typically this would be the user's first and last name. Since we do
    #     not store the user's real name, we return their username instead.
    #     """
    #     return self.first_name + " " + self.last_name

    # def get_short_name(self):
    #     """
    #     This method is required by Django for things like handling emails.
    #     Typically, this would be the user's first name. Since we do not store
    #     the user's real name, we return their username instead.
    #     """
    #     return self.first_name

    # def _generate_jwt_token(self):
    #     """
    #     Generates a JSON Web Token that stores this user's ID and has an expiry
    #     date set to 60 days into the future.
    #     """
    #     dt = datetime.now() + timedelta(days=60)

    #     # token = jwt.encode({
    #     #     'id': self.pk,
    #     #     'exp': int(dt.strftime('%s'))
    #     # }, settings.SECRET_KEY, algorithm='HS256')
    #     encoded_jwt = jwt.encode({"some": "payload"}, "q$o5mx19x9(9_^rzqf@o@s^t%t!ghix7($f9ymy49_^ryzq9x9", algorithm="HS256")

    #     # return token.decode('utf-8')
    #     return jwt.decode(encoded_jwt, "q$o5mx19x9(9_^rzqf@o@s^t%t!ghix7($f9ymy49_^ryzq9x9", algorithms=["HS256"])


class Team(models.Model):
    id = models.CharField(max_length=9, primary_key=True, verbose_name='Team ID')
    name = models.CharField(max_length=50, verbose_name="Team Name", unique=True)
    leader = models.ForeignKey(ExtendedUser, blank=True, related_name="teams_created", on_delete=models.CASCADE)
    members = models.ManyToManyField(ExtendedUser, related_name="teams")
    event = models.ForeignKey(Event, blank=True, related_name="participating_teams", on_delete=models.CASCADE)
    isEligible = models.BooleanField(default=False, verbose_name="Is Team Eligible or Not")

    def __str__(self):
        return self.name


class Submissions(models.Model):
    user = models.ForeignKey(ExtendedUser, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    file_url = models.URLField(max_length=1000, blank=True, null=True)

    class Meta:
        verbose_name_plural = 'Submissions'



class PreRegistration(models.Model):
    email = models.EmailField(max_length=100, unique=True,primary_key=True)
    name = models.CharField(max_length=100)
    college = models.CharField(max_length=100)
    contact = models.CharField(max_length=10)
    year = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    por = models.CharField(max_length=100,null=True,blank=True)
    poc_por = models.CharField(max_length=100,null=True,blank=True)
    def __str__(self):
        return self.email


class CampusAmbassador(models.Model):
    username = None
    email = models.EmailField(unique=True, blank=False, null=False, verbose_name='Email',default='ca_mail')
    USERNAME_FIELD = 'email'
    invite_referral = models.CharField(max_length=8, unique=True, null=True, blank=True, verbose_name='Referral Code for Inviting')
    ca_count = models.IntegerField(default=0)

    def __str__(self):
        return self.email    