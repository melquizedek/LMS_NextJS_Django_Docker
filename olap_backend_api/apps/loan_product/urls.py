from django.urls import path

from .views import LoanProductDetailView, LoanProductListView

app_name = 'loan_product'

urlpatterns = [
    path('', LoanProductListView.as_view(), name='loan_product_list'),
    path('<int:pk>/', LoanProductDetailView.as_view(), name='loan_product_detail'),
]
