from django.contrib import admin
from .models.Pollutant import Pollutant
from .models.PollutionType import PollutionType


@admin.register(Pollutant)
class AdminPollutant(admin.ModelAdmin):
    model = Pollutant

@admin.register(PollutionType)
class AdminPollutionType(admin.ModelAdmin):
    model = PollutionType
