from django.db import models


class Pollutant(models.Model):
   name=models.CharField(max_length=30,unique=True)
   threshold=models.FloatField()
   description=models.TextField(blank=True,null=True)
   type=models.ForeignKey('PollutionType', on_delete=models.CASCADE)

   def __str__(self):
      return self.name
