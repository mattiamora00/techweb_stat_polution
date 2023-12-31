from django.db import models


class Rilevation(models.Model):
    timestamp = models.DateTimeField()
    quantity = models.FloatField()
    sensor = models.ForeignKey("Sensor", on_delete=models.RESTRICT)

    def __str__(self):
        return f"{self.sensor.sensor_code} {self.sensor.city.name} {self.timestamp} {self.quantity} {self.sensor.pollutant.name}"
