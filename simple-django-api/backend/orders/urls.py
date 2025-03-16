# orders/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('order/', views.create_order, name='create-order'),
    path('order/<int:order_id>/', views.get_order, name='get-order'),
]
