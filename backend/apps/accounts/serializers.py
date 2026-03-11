from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from .models import User, UserProfile
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import re

class MyTokenSerializer(TokenObtainPairSerializer):
    # customise error text(s)
    default_error_messages = {
        "no_active_account": "Email or password is incorrect."  # ← your custom text
    }

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # add extra claims if desired
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = UserSerializer(self.user).data
        return data

class UserRegistrationSerializer(serializers.Serializer):
    # username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    phone_number = serializers.CharField(
        max_length=13,
        allow_null=False,
        allow_blank=False,
        error_messages={
            'blank': 'The mobile number should not be blank.',
            'null': 'The mobile number should not be null.',
            'max_length': 'Invalid mobile number. It should be 12 digits long. Include the country code (e.g., 639461767001).'
        }
    )
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)
    date_of_birth = serializers.DateField(required=False, allow_null=True)

    @staticmethod
    def _clean_phone_number(phone_number):
        return re.sub(r'\D', '', str(phone_number))

    def validate_phone_number(self, value):
        # Remove any non-digit characters

        phone_number = self._clean_phone_number(value)

        if phone_number and User.objects.filter(phone_number=phone_number).exists():
            raise serializers.ValidationError("A user with that phone number already exists.")

        # Check if the number starts with 63 and is exactly 12 digits
        elif not (phone_number.startswith('63') and len(phone_number) == 12):
            raise serializers.ValidationError(
                "Invalid mobile number. It should be 12 digits long. Include the country code (e.g., 639461767001)."
            )
            
        return value

    # def validate_username(self, value):
    #     if User.objects.filter(username__iexact=value).exists():
    #         raise serializers.ValidationError("A user with that username already exists.")
    #     return value

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("A user with that email already exists.")
        return value

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Passwords don't match")
        return attrs

    def create(self, validated_data):
        password = validated_data.pop('password')
        validated_data.pop('password_confirm')
        
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=password,
            phone_number=self._clean_phone_number(validated_data.get('phone_number')),
            date_of_birth=validated_data.get('date_of_birth')
        )
        
        # Create associated profile
        UserProfile.objects.create(user=user)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('first_name', 'last_name', 'bio', 'avatar', 'address', 'city', 'country', 'postal_code')


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'phone_number', 'is_email_verified',
                  'is_phone_verified', 'date_of_birth', 'created_at', 'profile')
        read_only_fields = ('id', 'is_email_verified', 'is_phone_verified', 'created_at')


class EmailVerificationSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=100)


class PhoneVerificationSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=6)


class ResendVerificationSerializer(serializers.Serializer):
    verification_type = serializers.ChoiceField(choices=[('email', 'Email'), ('phone', 'Phone')])


class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])
    new_password_confirm = serializers.CharField(required=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password_confirm']:
            raise serializers.ValidationError("New passwords don't match")
        return attrs