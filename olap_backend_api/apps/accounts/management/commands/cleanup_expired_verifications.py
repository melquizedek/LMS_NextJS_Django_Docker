from django.core.management.base import BaseCommand
from django.utils import timezone
from apps.accounts.models import EmailVerification, PhoneVerification


class Command(BaseCommand):
    help = 'Clean up expired verification tokens and codes'

    def handle(self, *args, **options):
        now = timezone.now()

        # Delete expired email verifications
        expired_email_verifications = EmailVerification.objects.filter(
            expires_at__lt=now
        )
        email_count = expired_email_verifications.count()
        expired_email_verifications.delete()

        # Delete expired phone verifications
        expired_phone_verifications = PhoneVerification.objects.filter(
            expires_at__lt=now
        )
        phone_count = expired_phone_verifications.count()
        expired_phone_verifications.delete()

        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully cleaned up {email_count} expired email verifications '
                f'and {phone_count} expired phone verifications'
            )
        )
