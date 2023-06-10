from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

class City(models.Model):
    name=models.CharField(max_length=30,unique=True)
    lat=models.FloatField()
    lng=models.FloatField()
    inhabitants=models.IntegerField(blank=True,null=True)
    inhabitants_name=models.CharField(max_length=30,blank=True,null=True),
    male_percentage= models.PositiveIntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)],blank=True,null=True)
    female_percentage = models.PositiveIntegerField(default=10, validators=[MinValueValidator(0), MaxValueValidator(100)],blank=True,null=True)
    state=models.ForeignKey('State', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name}"
