from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, UserProfile, EmailVerification, PhoneVerification


class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Profile'


class UserAdmin(BaseUserAdmin):
    inlines = (UserProfileInline,)
    list_display = ('email', 'username', 'is_email_verified', 'is_phone_verified', 'is_staff', 'date_joined')
    list_filter = ('is_email_verified', 'is_phone_verified', 'is_staff', 'is_superuser', 'is_active')
    search_fields = ('email', 'username', 'phone_number')

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions',)
        }),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        ('Additional Info', {
            'fields': ('phone_number', 'is_email_verified', 'is_phone_verified', 'date_of_birth')
        }),
    )


@admin.register(EmailVerification)
class EmailVerificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'token', 'created_at', 'expires_at', 'is_used')
    list_filter = ('is_used', 'created_at')
    search_fields = ('user__email', 'token')


@admin.register(PhoneVerification)
class PhoneVerificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'code', 'created_at', 'expires_at', 'is_used', 'attempts')
    list_filter = ('is_used', 'created_at')
    search_fields = ('user__phone_number', 'code')


admin.site.register(User, UserAdmin)
from django.contrib import admin

# Register your models here.
