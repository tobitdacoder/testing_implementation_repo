# backend/orders/tests.py
from django.test import TestCase
from .models import Order

# class OrderModelTest(TestCase):

#     def setUp(self):
#         """Setup test data before each test runs"""
#         self.order1 = Order.objects.create(product_name="Laptop", quantity=2)
#         self.order2 = Order.objects.create(product_name="Phone", quantity=5)

#     def test_create_order(self):
#         """Test creating an order"""
#         order = Order.objects.create(product_name="Tablet", quantity=3)
#         self.assertEqual(order.product_name, "Tablet")
#         self.assertEqual(order.quantity, 3)

#     def test_read_orders(self):
#         """Test retrieving orders from the database"""
#         orders = Order.objects.all()
#         self.assertEqual(orders.count(), 2)


import pytest
from rest_framework.test import APIClient
from django.urls import reverse

@pytest.mark.django_db
def test_create_order_missing_fields():
    client = APIClient()
    url = reverse("order-create")  # Adjust this based on your URL names
    data = {}  # Empty request body
    response = client.post(url, data, format="json")

    assert response.status_code == 400  # Expecting "Bad Request"
    assert "This field is required." in str(response.data)
    
    
@pytest.mark.django_db
def test_get_nonexistent_order():
    client = APIClient()
    url = reverse("order-detail", args=[9999])  # Non-existent order ID
    response = client.get(url)

    assert response.status_code == 404  # Expecting "Not Found"
    assert response.data["detail"] == "Not found."


from unittest.mock import patch

@pytest.mark.django_db
@patch("orders.views.Order.objects.create")
def test_internal_server_error(mock_create):
    mock_create.side_effect = Exception("Database Error")  # Simulate failure
    client = APIClient()
    url = reverse("order-create")
    data = {"id": 1, "product": "Laptop", "quantity": 2}

    response = client.post(url, data, format="json")

    assert response.status_code == 500  # Expecting "Internal Server Error"
    assert "Something went wrong" in response.data["error"]
