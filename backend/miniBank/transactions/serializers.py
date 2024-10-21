from rest_framework import serializers
from .models import Transaction, TransferRequest

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'sender', 'recipient', 'amount', 'timestamp', 'description']
        read_only_fields = ['id', 'timestamp']

    def validate(self, data):
        sender = data.get('sender')
        amount = data.get('amount')

        if sender.balance < amount:
            raise serializers.ValidationError("Niewystarczające środki na koncie.")

        return data

    def create(self, validated_data):
        sender = validated_data['sender']
        recipient = validated_data['recipient']
        amount = validated_data['amount']

        sender.balance -= amount
        sender.save()

        recipient.balance += amount
        recipient.save()

        transaction = Transaction.objects.create(**validated_data)
        return transaction

class TransferRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransferRequest
        fields = ['id', 'from_account', 'amount', 'message', 'created_at']

