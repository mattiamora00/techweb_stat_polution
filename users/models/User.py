from django.conf import settings
from django.core.validators import MinLengthValidator
from django.db import models
import hashlib

class User(models.Model):
    username=models.CharField(max_length=30,unique=True)
    email=models.EmailField()
    password=models.CharField(max_length=64,validators=[MinLengthValidator(64)])
    view_sensor=models.BooleanField(default=False)
    view_plan=models.BooleanField(default=False)
    view_graph=models.BooleanField(default=True)
    view_sick=models.BooleanField(default=False)
    profile_image = models.ImageField(upload_to ='profile_image/',blank=True,null=True)

    def save(self,*args,**kwargs):

        if len(self.password)<64 :
            self.password=hashlib.sha256(self.password.encode('utf-8')).hexdigest()
        super().save()

    def __str__(self):
        return f"{self.username} {self.email}"
