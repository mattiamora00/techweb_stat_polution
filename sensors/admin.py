from django.contrib import admin
from .models.Rilevation import Rilevation
from .models.Sensor import Sensor
from tenant.utils.admin import TenantAdmin,SharedAdmin
from tenant.models import Tenant
from django_tenants.admin import TenantAdminMixin
from tenant.utils.admin import TenantAdmin,SharedAdmin


@admin.register(Rilevation)
class AdminRilevation(TenantAdmin):
    model = Rilevation

@admin.register(Sensor)
class AdminSensor(TenantAdmin):
    model = Sensor
