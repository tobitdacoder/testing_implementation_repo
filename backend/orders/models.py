# backend/orders/models.py
from django.db import models

class Order(models.Model):
    product_name = models.CharField(max_length=100)
    quantity = models.IntegerField()

    def __str__(self):
        return self.product_name
