from django.db import models
from users.models import ExtendedUser

PAYMENT_STATUS = (
    ('success', 'Success'),
    ('failed', 'Failed'),
    ('aborted', 'Aborted')
)

# Create your models here.
class Payment(models.Model):
    user = models.ForeignKey(ExtendedUser,on_delete=models.CASCADE)
    amount = models.IntegerField(default=0)
    payment_status = models.CharField(max_length=30, choices=PAYMENT_STATUS)
    isPaid = models.BooleanField(default=False)
    last_pay = models.DateTimeField(auto_now=True)