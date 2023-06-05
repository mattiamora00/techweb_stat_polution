from django.core.validators import MinLengthValidator
from django.db import models

class User(models.Model):
    username=models.CharField(max_length=30)
    email=models.EmailField()
    password=models.CharField(max_length=64,validators=[MinLengthValidator(64)])
    view_sensor=models.BooleanField(default=False)
    view_plan=models.BooleanField(default=False)
    view_graph=models.BooleanField(default=False)
    view_sick=models.BooleanField(default=False)
