from django.urls import path
from .views import UserList, UserAccountList, LoanApplicationList, LoanApplicationDetails, UserBlock

urlpatterns = [
    path('users/', UserList.as_view(), name='user-list'),
    path('users/<int:user_id>/accounts/', UserAccountList.as_view(), name='user-accounts'),
    path('loans/', LoanApplicationList.as_view(), name='loan-list'),
    path('loans/<int:pk>/', LoanApplicationDetails.as_view(), name='loan-detail'),
    path('users/<int:pk>/block/', UserBlock.as_view(), name='user-block'),
]
