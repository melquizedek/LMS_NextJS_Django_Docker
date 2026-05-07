from rest_framework import serializers

from .models import LoanProduct


class LoanProductSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=255)
    type = serializers.CharField(max_length=100)
    min_amount = serializers.DecimalField(max_digits=15, decimal_places=2)
    max_amount = serializers.DecimalField(max_digits=15, decimal_places=2)
    base_interest_rate = serializers.DecimalField(max_digits=8, decimal_places=4)
    max_term_months = serializers.IntegerField(min_value=1)
    is_active = serializers.BooleanField(default=True)

    def validate_name(self, value):
        """
        Check that the name is unique (case-insensitive).
        """
        queryset = LoanProduct.objects.filter(name__iexact=value)
        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)
        if queryset.exists():
            raise serializers.ValidationError("A loan product with this name already exists.")
        return value

    def validate(self, data):
        min_amount = data.get('min_amount')
        max_amount = data.get('max_amount')
        if min_amount is not None and max_amount is not None and min_amount > max_amount:
            raise serializers.ValidationError(
                {'min_amount': 'min_amount cannot be greater than max_amount.'}
            )
        return data

    def create(self, validated_data):
        return LoanProduct.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
