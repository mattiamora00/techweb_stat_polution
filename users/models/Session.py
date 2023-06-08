from django.conf import settings
from django.core.validators import MinLengthValidator
from django.db import models


class Session(models.Model):
    token=models.CharField(max_length=64)
    user_id=models.ForeignKey('User', on_delete=models.CASCADE)

    def __str__(self):
        return f"${self.token} {self.user_id}"