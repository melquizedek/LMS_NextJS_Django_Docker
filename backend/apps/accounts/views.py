from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.utils import timezone
from django.shortcuts import get_object_or_404
from .models import User, UserProfile, EmailVerification, PhoneVerification
from .serializers import (
    UserRegistrationSerializer, UserSerializer, UserProfileSerializer,
    EmailVerificationSerializer, PhoneVerificationSerializer,
    ResendVerificationSerializer, PasswordChangeSerializer, MyTokenSerializer
)
from .tasks import send_verification_email, send_verification_sms, send_sms_via_infobip


class CustomTokenObtainPairView(TokenObtainPairView):
    # serializer_class = MyTokenSerializer
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            user = authenticate(
                    request,
                    username=request.data.get('email'),
                    password=request.data.get('password')
                )
            if user:
                user_data = UserSerializer(user).data
                response.data['user'] = user_data
        return response


class UserRegistrationView(generics.CreateAPIView):
    """
    View for registering a new user.
    """
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        """
        Handle POST requests for user registration.
        """
        # Get the serializer instance
        serializer = self.get_serializer(data=request.data)

        # Validate the serializer data
        serializer.is_valid(raise_exception=True)

        # Save the validated serializer data
        user = serializer.save()

        # Create an email verification object for the user
        email_verification = EmailVerification.objects.create(user=user)

        # Send the verification email using Celery
        send_verification_email.delay(user.email, email_verification.token)

        # If the user has a phone number, create a phone verification object and send the verification code
        if user.phone_number:
            phone_verification = PhoneVerification.objects.create(user=user)
            # send_verification_sms.delay(str(user.phone_number), phone_verification.code)
            send_sms_via_infobip.delay(str(user.phone_number), phone_verification.code)

        # Generate tokens for the user
        refresh = RefreshToken.for_user(user)

        # Return a response with the user data, tokens, and a message
        return Response({
            'message': 'User registered successfully',
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)


class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class UserProfileDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        print('user_profile_details_update', self.request.user)
        profile, created = UserProfile.objects.get_or_create(user=self.request.user)
        return profile


@api_view(['POST', 'GET'])
@permission_classes([permissions.AllowAny])
def verify_email(request):
    request_data = {}
    if request.method == 'GET':
        request_data = request.query_params
    elif request.method == 'POST':
        request_data = request.data
    serializer = EmailVerificationSerializer(data=request_data)
    if serializer.is_valid():
        token = serializer.validated_data['token']
        try:
            verification = EmailVerification.objects.get(
                token=token,
                is_used=False
            )

            if verification.is_expired():
                return Response({
                    'error': 'Verification token has expired'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Mark email as verified
            user = verification.user
            user.is_email_verified = True
            user.save()

            # Mark verification as used
            verification.is_used = True
            verification.save()

            return Response({
                'message': 'Email verified successfully'
            }, status=status.HTTP_200_OK)

        except EmailVerification.DoesNotExist:
            return Response({
                'error': 'Invalid verification token'
            }, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def verify_phone(request):
    serializer = PhoneVerificationSerializer(data=request.data)
    if serializer.is_valid():
        code = serializer.validated_data['code']
        user = request.user

        try:
            verification = PhoneVerification.objects.get(
                user=user,
                code=code,
                is_used=False
            )

            if verification.is_expired():
                return Response({
                    'error': 'Verification code has expired'
                }, status=status.HTTP_400_BAD_REQUEST)

            if verification.attempts >= 3:
                return Response({
                    'error': 'Too many verification attempts. Please request a new code.'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Mark phone as verified
            user.is_phone_verified = True
            user.save()

            # Mark verification as used
            verification.is_used = True
            verification.save()

            return Response({
                'message': 'Phone number verified successfully'
            }, status=status.HTTP_200_OK)

        except PhoneVerification.DoesNotExist:
            # Increment attempts for existing verifications
            PhoneVerification.objects.filter(
                user=user,
                is_used=False
            ).update(attempts=models.F('attempts') + 1)

            return Response({
                'error': 'Invalid verification code'
            }, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def resend_verification(request):
    serializer = ResendVerificationSerializer(data=request.data)
    if serializer.is_valid():
        verification_type = serializer.validated_data['verification_type']
        user = request.user

        if verification_type == 'email':
            if user.is_email_verified:
                return Response({
                    'message': 'Email is already verified'
                }, status=status.HTTP_200_OK)

            # Invalidate old tokens
            EmailVerification.objects.filter(user=user, is_used=False).update(is_used=True)

            # Create new verification
            email_verification = EmailVerification.objects.create(user=user)
            send_verification_email.delay(user.email, email_verification.token)

            return Response({
                'message': 'Email verification sent'
            }, status=status.HTTP_200_OK)

        elif verification_type == 'phone':
            if not user.phone_number:
                return Response({
                    'error': 'No phone number associated with this account'
                }, status=status.HTTP_400_BAD_REQUEST)

            if user.is_phone_verified:
                return Response({
                    'message': 'Phone number is already verified'
                }, status=status.HTTP_200_OK)

            # Invalidate old codes
            PhoneVerification.objects.filter(user=user, is_used=False).update(is_used=True)

            # Create new verification
            phone_verification = PhoneVerification.objects.create(user=user)
            send_verification_sms.delay(str(user.phone_number), phone_verification.code)

            return Response({
                'message': 'Phone verification code sent'
            }, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def change_password(request):
    serializer = PasswordChangeSerializer(data=request.data)
    if serializer.is_valid():
        user = request.user

        # Check old password
        if not user.check_password(serializer.validated_data['old_password']):
            return Response({
                'error': 'Invalid old password'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Set new password
        user.set_password(serializer.validated_data['new_password'])
        user.save()

        return Response({
            'message': 'Password changed successfully'
        }, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({
            'message': 'Logged out successfully'
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            'error': 'Invalid token'
        }, status=status.HTTP_400_BAD_REQUEST)

