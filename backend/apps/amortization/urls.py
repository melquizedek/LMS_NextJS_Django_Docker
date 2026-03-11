"""URL routing for the amortization app."""
from django.urls import path
from .views import AmortizationScheduleView

app_name = "amortization"

urlpatterns = [
    path(
        "schedule/",
        AmortizationScheduleView.as_view(),
        name="schedule",
    ),
]
