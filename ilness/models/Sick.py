from django.core.validators import MinLengthValidator
from django.db import models


class Sick(models.Model):
    gender_choices=[
        ("M","Male"),
        ("F","Female"),
    ]

    fiscal_code=models.CharField(max_length=16, validators=[MinLengthValidator(16)],unique=True),
    name=models.CharField(max_length=30),
    surname=models.CharField(max_length=30),
    gender=models.TextField(choices=gender_choices,blank=True,null=True),
    population=models.ForeignKey('geo.City', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} {self.fiscal_code}"