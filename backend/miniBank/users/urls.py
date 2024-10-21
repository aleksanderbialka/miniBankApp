from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UserRegistration, UserUpdate, Logout, UserMe

urlpatterns = [
    path('register/', UserRegistration.as_view(), name='user-register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', UserUpdate.as_view(), name='user-profile'),
    path('logout/', Logout.as_view(), name='logout'),
    path('me/', UserMe.as_view(), name='user-me'),
]
