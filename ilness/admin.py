from django.contrib import admin
from .models.Cause import Cause
from .models.Illness import Illness
from .models.Sick import Sick
from .models.SickIllness import SickIllness
from tenant.utils.admin import TenantAdmin,SharedAdmin
from tenant.models import Tenant

@admin.register(Cause)
class AdminCause(SharedAdmin):
    model = Cause

@admin.register(Illness)
class AdminIllness(SharedAdmin):
    model = Illness

@admin.register(Sick)
class AdminSick(SharedAdmin):
    model = Sick

@admin.register(SickIllness)
class AdminSickIllness(SharedAdmin):
    model = SickIllness
