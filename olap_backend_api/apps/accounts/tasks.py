from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings
from twilio.rest import Client
import logging
import http.client
import json

logger = logging.getLogger(__name__)


@shared_task
def send_verification_email(user_email, token):
    """Send email verification link"""
    try:
        subject = 'Verify Your Email Address'
        message = f'''
        Hello,

        Please click the link below to verify your email address:

        http://localhost:8000/api/auth/verify-email/?token={token}

        This link will expire in 1 hour.

        If you didn't create an account, please ignore this email.

        Best regards,
        Your App Team
        '''

        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [user_email],
            fail_silently=False,
        )
        return f"Email sent successfully to {user_email}"
    except Exception as e:
        logger.error(f"Failed to send email to {user_email}: {str(e)}")
        return f"Failed to send email: {str(e)}"


@shared_task
def send_verification_sms(phone_number, code):
    """Send SMS verification code"""
    try:
        client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

        message = client.messages.create(
            body=f'Your verification code is: {code}. This code will expire in 5 minutes.',
            from_=settings.TWILIO_PHONE_NUMBER,
            to=str(phone_number)
        )

        return f"SMS sent successfully to {phone_number}"
    except Exception as e:
        logger.error(f"Failed to send SMS to {phone_number}: {str(e)}")
        return f"Failed to send SMS: {str(e)}"

@shared_task
def send_sms_via_infobip(phone_number, code):
    try:
        conn = http.client.HTTPSConnection(settings.INFOBIP_API_BASE_URL)
        payload = json.dumps({
            "messages": [
                {
                    "destinations": [
                        {
                            "to": phone_number
                        }
                    ],
                    "from": settings.INFOBIP_SENDER_ID,
                    "text": f'Your verification code is: {code}. This code will expire in 5 minutes.',
                }
            ]
        })
        headers = {
            'Authorization': f'App {settings.INFOBIP_API_KEY}',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        print('payload => ', payload)
        conn.request("POST", "/sms/2/text/advanced", payload, headers)
        res = conn.getresponse()
        data = res.read()
        print(data.decode("utf-8"))
    except Exception as e:
        logger.error(f"Failed to send SMS to {phone_number}: {str(e)}")
        return f"Failed to send SMS: {str(e)}"
