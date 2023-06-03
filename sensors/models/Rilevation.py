from django.db import models

class Rilevation(models.Model):
    timestamp=models.DateTimeField()
    quantity=models.FloatField()
    sensor=models.ForeignKey("Sensor",on_delete=models.DO_NOTHING)
