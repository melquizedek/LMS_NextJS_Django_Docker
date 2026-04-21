from django.db import models


class LoanProduct(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=100)
    min_amount = models.DecimalField(max_digits=15, decimal_places=2)
    max_amount = models.DecimalField(max_digits=15, decimal_places=2)
    base_interest_rate = models.DecimalField(max_digits=8, decimal_places=4)
    max_term_months = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
