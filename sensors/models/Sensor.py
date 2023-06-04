from django.db import models


class Sensor(models.Model):
    sensor_code = models.CharField(max_length=10, unique=True)
    lat = models.FloatField()
    lng = models.FloatField()
    city = models.ForeignKey("geo.City", on_delete=models.CASCADE)
    pollutant = models.ForeignKey("pollutants.Pollutant", on_delete=models.CASCADE)
    date_change_filter = models.DateField(blank=True,null=True)
    oxidation_level = models.FloatField(blank=True,null=True)
    sensor_model=models.CharField(max_length=30)


    def __str__(self):
        return f"{self.sensor_code} {self.city.name} {self.pollutant.name} {self.sensor_model}"

