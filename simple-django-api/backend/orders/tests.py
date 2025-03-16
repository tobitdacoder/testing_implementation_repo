# orders/tests.py
import pytest
from rest_framework.test import APIClient
from django.urls import reverse

@pytest.mark.django_db
def test_create_order_missing_fields():
    client = APIClient()
    url = reverse('create-order')
    data = {}  # Empty request body
    response = client.post(url, data, format='json')

    assert response.status_code == 400  # Expecting "Bad Request"
    assert 'Missing required fields' in str(response.data)

@pytest.mark.django_db
def test_get_nonexistent_order():
    client = APIClient()
    url = reverse('get-order', args=[9999])  # Non-existent order ID
    response = client.get(url)

    assert response.status_code == 404  # Expecting "Not Found"
    assert response.data['detail'] == 'Not found.'
