from django.urls import path
from .views import AccountCreate, AccountDetail, Blik, LoanApplication, UserAccountList, UserLoanApplicationList, AllAccountList

urlpatterns = [
    path('create/', AccountCreate.as_view(), name='account-create'),
    path('<int:pk>/', AccountDetail.as_view(), name='account-detail'),
    path('blik/<int:account_id>/', Blik.as_view(), name='blik-code'),
    path('loan-application/', LoanApplication.as_view(), name='loan-application'),
    path('loan-applications/', UserLoanApplicationList.as_view(), name='user-loan-applications'),
    path('', UserAccountList.as_view(), name='user-accounts'),
    path('all/', AllAccountList.as_view(), name='all-accounts'),
]
