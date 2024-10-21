import random
from datetime import timedelta
from django.utils import timezone
from django.db import models
from users.models import CustomUser

class Account(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='accounts')
    account_number = models.CharField(max_length=16, unique=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)
    blik_code = models.CharField(max_length=6, blank=True)
    blik_last_updated = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Account {self.account_number} for {self.user.username}"

    def generate_blik_code(self):
        now = timezone.now()

        if not self.blik_last_updated or (now - self.blik_last_updated) > timedelta(minutes=2):
            self.blik_code = ''.join([str(random.randint(0, 9)) for _ in range(6)])
            self.blik_last_updated = now
            self.save(update_fields=['blik_code', 'blik_last_updated'])
            print(f"Generated new BLIK code: {self.blik_code}")
        else:
            print(f"Using existing BLIK code: {self.blik_code}")
class LoanApplicationModel(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='loan_applications')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    monthly_income = models.DecimalField(max_digits=10, decimal_places=2)
    address = models.CharField(max_length=255)
    status = models.CharField(max_length=20, default="Pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Loan application for {self.user.username}, status: {self.status}"
