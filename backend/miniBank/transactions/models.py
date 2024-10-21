from django.db import models
from accounts.models import Account
from django.utils import timezone
from accounts.models import CustomUser

class Transaction(models.Model):
    sender = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='sent_transactions')
    recipient = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='received_transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(default=timezone.now)
    description = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"Transaction from {self.sender} to {self.recipient} - {self.amount} PLN"

class TransferRequest(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    from_account = models.CharField(max_length=16)  # Konto, z którego prosimy o przelew
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # Kwota
    message = models.CharField(max_length=255, blank=True, null=True)  # Opcjonalna wiadomość
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Prośba o przelew od {self.user.username} z konta {self.from_account}"

