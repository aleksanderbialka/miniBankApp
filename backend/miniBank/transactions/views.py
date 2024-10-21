from rest_framework import generics, serializers, status
from rest_framework.permissions import IsAuthenticated
from .serializers import TransactionSerializer, TransferRequestSerializer
from accounts.models import Account
from .models import Transaction
from rest_framework.exceptions import PermissionDenied
from rest_framework.views import APIView
from rest_framework.response import Response


class TransactionCreate(generics.CreateAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        sender_account_id = self.request.data.get('sender')
        recipient_account_id = self.request.data.get('recipient')

        if not sender_account_id or not recipient_account_id:
            raise serializers.ValidationError("Brak wymaganych pól: 'sender' lub 'recipient'.")

        try:
            sender_account = Account.objects.get(id=sender_account_id)
            recipient_account = Account.objects.get(id=recipient_account_id)

            if sender_account.id == recipient_account.id:
                raise serializers.ValidationError("Nie można przesyłać środków na to samo konto.")

            if sender_account.user != self.request.user:
                raise PermissionDenied("Nie masz uprawnień do tego konta.")

            serializer.save(sender=sender_account)

        except Account.DoesNotExist:
            raise serializers.ValidationError("Nie znaleziono konta nadawcy.")


class SentTransactionList(generics.ListAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(sender__user=self.request.user)

class ReceivedTransactionList(generics.ListAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(recipient__user=self.request.user)

class TransferRequestCreate(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = TransferRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)