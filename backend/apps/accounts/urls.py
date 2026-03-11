from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    # Authentication
    path('login/', views.CustomTokenObtainPairView.as_view(), name='login'),
    path('register/', views.UserRegistrationView.as_view(), name='register'),
    path('logout/', views.logout, name='logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # User Profile
    path('profile/', views.UserProfileView.as_view(), name='user_profile'),
    path('profile/details/', views.UserProfileDetailView.as_view(), name='user_profile_details'),

    # Verification
    path('verify-email/', views.verify_email, name='verify_email'),
    path('verify-phone/', views.verify_phone, name='verify_phone'),
    path('resend-verification/', views.resend_verification, name='resend_verification'),

    # Password Management
    path('change-password/', views.change_password, name='change_password'),
]
