from django.db import models

class Profile(models.Model):
    username = models.CharField(max_length=100)
    profile_picture = models.ImageField(upload_to='profile_pics/')
