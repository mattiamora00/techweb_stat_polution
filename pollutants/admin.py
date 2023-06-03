from django.contrib import admin
from .models.Pollutant import Pollutant
from .models.PollutionType import PollutionType
from tenant.utils.admin import TenantAdmin,SharedAdmin
from tenant.models import Tenant


@admin.register(Pollutant)
class AdminPollutant(SharedAdmin):
    model = Pollutant

@admin.register(PollutionType)
class AdminPollutionType(SharedAdmin):
    model = PollutionType
