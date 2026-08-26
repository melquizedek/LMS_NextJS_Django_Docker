from django.contrib import admin

from .models import LoanProduct


@admin.register(LoanProduct)
class LoanProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'min_amount', 'max_amount', 'base_interest_rate', 'max_term_months', 'is_active')
    list_filter = ('type', 'is_active')
    search_fields = ('name', 'type')
    ordering = ('name',)
