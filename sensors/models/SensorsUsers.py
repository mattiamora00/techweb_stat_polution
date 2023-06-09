from django.db import models


class SensorsUsers(models.Model):
    user = models.ForeignKey("users.User", on_delete=models.CASCADE)
    sensor = models.ForeignKey("Sensor", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.sensor.sensor_code} {self.user.username}"
