from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from users.models import CustomUser
from accounts.models import Account
from accounts.models import LoanApplicationModel
from .serializers import UserSerializer, AccountSerializer, LoanApplicationSerializer

class UserList(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

class UserAccountList(generics.ListAPIView):
    serializer_class = AccountSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Account.objects.filter(user__id=user_id)

class LoanApplicationList(generics.ListAPIView):
    queryset = LoanApplicationModel.objects.all()
    serializer_class = LoanApplicationSerializer
    permission_classes = [IsAdminUser]

class LoanApplicationDetails(generics.RetrieveUpdateAPIView):
    queryset = LoanApplicationModel.objects.all()
    serializer_class = LoanApplicationSerializer
    permission_classes = [IsAdminUser]

    def perform_update(self, serializer):
        loan = serializer.save()
        if loan.status == "Approved":

            account = loan.user.accounts.first()
            account.balance += loan.amount
            account.save()

class UserBlock(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def perform_update(self, serializer):
        user = self.get_object()

        user.is_active = not user.is_active
        user.save()
        serializer.save()
