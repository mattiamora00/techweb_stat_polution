from django.conf import settings
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
    user = models.OneToOneField(settings.AUTH_USER_MODEL, null=True, blank=True,related_name='profile', on_delete=models.SET_NULL)
    profile_image = models.ImageField(upload_to ='profile_image/',blank=True,null=True)

    def __str__(self):
        return f"${self.username} {self.email}"
