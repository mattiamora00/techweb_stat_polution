from django.contrib import admin
from .models.City import City
from .models.State import State
from tenant.utils.admin import TenantAdmin,SharedAdmin
from tenant.models import Tenant

@admin.register(City)
class AdminCity(SharedAdmin):
    model = City

@admin.register(State)
class AdminState(SharedAdmin):
    model = State
