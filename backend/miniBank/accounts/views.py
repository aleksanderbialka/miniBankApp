from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Account, LoanApplicationModel
from .serializers import AccountSerializer, LoanApplicationSerializer
import random

class UserAccountList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        accounts = Account.objects.filter(user=request.user)
        serializer = AccountSerializer(accounts, many=True)
        return Response(serializer.data)

class Blik(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, account_id):
        try:
            account = Account.objects.get(id=account_id, user=request.user)
            account.generate_blik_code()
            return Response({"blik_code": account.blik_code})
        except Account.DoesNotExist:
            return Response({"error": "Account not found"}, status=404)

class AccountCreate(generics.CreateAPIView):
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        account = serializer.save(user=self.request.user)
        account.generate_blik_code()
        random_balance = random.uniform(1000, 10000)
        serializer.save(user=self.request.user, balance=random_balance)

class AccountDetail(generics.RetrieveAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class LoanApplication(generics.CreateAPIView):
    serializer_class = LoanApplicationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserLoanApplicationList(generics.ListAPIView):
    serializer_class = LoanApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return LoanApplicationModel.objects.filter(user=self.request.user)

class AllAccountList(generics.ListAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]