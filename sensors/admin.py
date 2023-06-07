from django.contrib import admin
from .models.Rilevation import Rilevation
from .models.Sensor import Sensor


@admin.register(Rilevation)
class AdminRilevation(admin.ModelAdmin):
    model = Rilevation

@admin.register(Sensor)
class AdminSensor(admin.ModelAdmin):
    model = Sensor
