# from django.urls import path
# from . import views

# urlpatterns = [
#     path('login/', views.login_view, name='login'),
# ]

from django.urls import path
from .views import user_login

urlpatterns = [
    path('login/', user_login, name='login'),
]
