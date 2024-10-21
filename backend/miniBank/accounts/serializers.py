from rest_framework import serializers
from .models import Account, LoanApplicationModel

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'user', 'account_number', 'balance', 'created_at']
        read_only_fields = ['id', 'user', 'created_at', 'account_number', 'balance']

    def create(self, validated_data):
        user = self.context['request'].user
        account_number = self.generate_account_number()
        account = Account.objects.create(user=user, account_number=account_number)
        return account

    def generate_account_number(self):
        from random import randint
        return ''.join([str(randint(0, 9)) for _ in range(16)])

class LoanApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanApplicationModel
        fields = ['id', 'user', 'amount', 'monthly_income', 'address', 'status', 'created_at']
        read_only_fields = ['id', 'user', 'status', 'created_at']


