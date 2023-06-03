from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class State(models.Model):
    iso_code=models.CharField(max_length=2,unique=True)
    name=models.CharField(max_length=30)

    def __str__(self):
        return f"{self.iso_code} {self.name}"
