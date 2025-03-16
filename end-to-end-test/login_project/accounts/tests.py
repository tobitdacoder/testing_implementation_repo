import pytest
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APIClient

@pytest.mark.django_db
def test_user_login():
    # Create a test user
    user = User.objects.create_user(username='testuser', password='password123')

    # Create an APIClient instance to simulate HTTP requests
    client = APIClient()

    # Send a POST request to the login endpoint with the correct credentials
    url = reverse('login')
    response = client.post(url, {'username': 'testuser', 'password': 'password123'}, format='json')

    # Assert the response status code is 200 (success)
    assert response.status_code == 200
    assert response.data['message'] == 'Login successful'

@pytest.mark.django_db
def test_user_login_invalid_credentials():
    # Create a test user
    User.objects.create_user(username='testuser', password='password123')

    # Create an APIClient instance
    client = APIClient()

    # Send a POST request with invalid credentials
    url = reverse('login')
    response = client.post(url, {'username': 'testuser', 'password': 'wrongpassword'}, format='json')

    # Assert the response status code is 400 (failure)
    assert response.status_code == 400
    assert response.json()['error'] == 'Invalid credentials'
