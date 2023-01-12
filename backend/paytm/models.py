from django.db import models
from users.models import ExtendedUser

PAYMENT_STATUS = (
    ('Success', 'Success'),
    ('Failed', 'Failed'),
    ('Aborted', 'Aborted'),
    ('Initiated', 'Initiated')
)

PAYMENT_TYPE = (
    ("Accommodation", "Accommodation"),
    ("Cultural Night", "Cultural Night"),
    ("Jumbo Pack", "Jumbo Pack")
)

# Create your models here.
class Payment(models.Model):
    user = models.ForeignKey(ExtendedUser,on_delete=models.CASCADE)
    amount = models.FloatField(default=0)
    payment_status = models.CharField(max_length=30, choices=PAYMENT_STATUS, default='Initiated')
    isPaid = models.BooleanField(default=False)
    last_pay_now_clicked = models.DateTimeField(auto_now=True)
    payment_type = models.CharField(max_length=50, default=0, choices=PAYMENT_TYPE, blank=True, null=True)
    order_id = models.CharField(max_length=250, null=True)
    checksumhash = models.CharField(max_length=500,null=True)
    bank_txn_id = models.CharField(max_length=250,null=True,blank=True)
    payment_mode = models.CharField(max_length=100,null=True)
    response_code = models.IntegerField(null=True)
    response_msg = models.CharField(max_length=250, null=True)
    txn_date = models.CharField(max_length=50, null=True, blank=True)
    txn_id = models.CharField(max_length=1000, null=True)
    
    

    def __str__(self):
        return self.user.email

class CustomOrder(models.Model):
    amount = models.FloatField(default=0)
    order_id = models.CharField(max_length=250,null=True,blank=True)
    payment_from = models.CharField(max_length=250, null=True)
    payment_reason = models.CharField(max_length=500, null=True)
    link = models.CharField(max_length=500, null=True,blank=True)
