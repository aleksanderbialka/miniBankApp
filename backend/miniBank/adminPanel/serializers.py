from rest_framework import serializers
from users.models import CustomUser
from accounts.models import Account
from accounts.models import LoanApplicationModel

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'is_active']
        read_only_fields = ['id', 'username', 'email']

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'account_number', 'balance', 'created_at']

class LoanApplicationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = LoanApplicationModel
        fields = ['id', 'user', 'amount', 'monthly_income', 'address', 'status', 'created_at']
