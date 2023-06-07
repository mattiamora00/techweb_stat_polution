from django.contrib import admin
from .models.Cause import Cause
from .models.Illness import Illness
from .models.Sick import Sick
from .models.SickIllness import SickIllness

@admin.register(Cause)
class AdminCause(admin.ModelAdmin):
    model = Cause

@admin.register(Illness)
class AdminIllness(admin.ModelAdmin):
    model = Illness

@admin.register(Sick)
class AdminSick(admin.ModelAdmin):
    model = Sick

@admin.register(SickIllness)
class AdminSickIllness(admin.ModelAdmin):
    model = SickIllness
