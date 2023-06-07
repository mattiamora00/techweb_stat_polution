from django.contrib import admin
from .models.City import City
from .models.State import State

@admin.register(City)
class AdminCity(admin.ModelAdmin):
    model = City

@admin.register(State)
class AdminState(admin.ModelAdmin):
    model = State
