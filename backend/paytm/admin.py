from django.contrib import admin
from .models import Payment
from import_export import resources
from import_export.admin import ImportExportModelAdmin

# Register your models here.

class PaymentAdmin(ImportExportModelAdmin,admin.ModelAdmin):
    readonly_fields = ["last_pay_now_clicked"]
    list_display = ('user','payment_status','isPaid', 'order_id', 'payment_type', 'response_msg', 'bank_txn_id', 'last_pay_now_clicked', 'txn_date')
    list_filter = ('payment_status', 'isPaid','payment_type')
    

admin.site.register(Payment,PaymentAdmin)