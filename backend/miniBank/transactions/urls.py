from django.urls import path
from .views import TransactionCreate, SentTransactionList, ReceivedTransactionList, TransferRequestCreate

urlpatterns = [
    path('create/', TransactionCreate.as_view(), name='transaction-create'),
    path('sent/', SentTransactionList.as_view(), name='sent-transactions'),
    path('received/', ReceivedTransactionList.as_view(), name='received-transactions'),
    path('transfer-request/', TransferRequestCreate.as_view(), name='transfer-request')

]
