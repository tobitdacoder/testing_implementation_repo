from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from django.contrib.auth import get_user_model


class UserAuthTests(TestCase):
    # def setUp(self):
    #     self.client = APIClient()
    #     self.register_url = reverse('register')
    #     self.login_url = reverse('login')
    #     self.user_data = {'username': 'testuser', 'password': 'testpassword', 'email': 'test@example.com'}

    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.user_data = {'username': 'testuser', 'password': 'testpassword', 'email': 'test@example.com'}


    # def setUp(self):
    #     self.client = APIClient()
    #     self.register_url = reverse('register')
    #     self.login_url = reverse('login')
    #     self.user_data = {'username': 'testuser', 'password': 'testpassword', 'email': 'test@example.com'}
        
    #     # Manually create user with Django's create_user method
    #     User = get_user_model()
    #     User.objects.create_user(username="testuser", email="test@example.com", password="testpassword")

    def test_register_user(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        print(response.json())  # Add this line before assertEqual
        self.assertEqual(response.status_code, 201)
        
    def test_login_user(self):
        # Register the user first
        self.client.post(self.register_url, self.user_data, format='json')

        # Attempt to log in
        login_data = {'username': 'testuser', 'password': 'testpassword'}
        response = self.client.post(self.login_url, login_data, format='json')
        print(response.status_code, response.json())  # Debugging output
        self.assertEqual(response.status_code, 200)
    # def test_login_user(self):
    #     login_data = {'username': 'testuser', 'password': 'testpassword'}
    #     response = self.client.post(self.login_url, login_data, format='json')
    #     print(response.status_code, response.json())  # Debugging output
    #     self.assertEqual(response.status_code, 200)

    # def test_login_user(self):
    #     self.client.post(self.register_url, self.user_data, format='json')
    #     login_data = {'username': 'testuser', 'password': 'testpassword'}
    #     response = self.client.post(self.login_url, login_data, format='json')
    #     print(response.json())  # Add this line before assertEqual
    #     self.assertEqual(response.status_code, 200)

    # def test_login_user(self):
    #     # Register the user
    #     response = self.client.post(self.register_url, self.user_data, format='json')
    #     print(response.status_code, response.json())  # Debugging

    #     # Manually fetch user to ensure it's saved
    #     User = get_user_model()
    #     user = User.objects.filter(username='testuser').first()
    #     print("User exists:", user is not None)

    #     # Ensure user is correctly created
    #     self.assertIsNotNone(user, "User was not created successfully.")

    #     # Log in
    #     login_data = {'username': 'testuser', 'password': 'testpassword'}
    #     # login_data = {'email': 'test@example.com', 'password': 'testpassword'}
    #     response = self.client.post(self.login_url, login_data, format='json')
    #     print(response.status_code, response.json())  # Debugging

    #     self.assertEqual(response.status_code, 200)


