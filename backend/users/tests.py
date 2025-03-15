from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse

class UserAuthTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.user_data = {'username': 'testuser', 'password': 'testpassword', 'email': 'test@example.com'}

    def test_register_user(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)

    def test_login_user(self):
        self.client.post(self.register_url, self.user_data, format='json')
        login_data = {'username': 'testuser', 'password': 'testpassword'}
        response = self.client.post(self.login_url, login_data, format='json')
        self.assertEqual(response.status_code, 200)
