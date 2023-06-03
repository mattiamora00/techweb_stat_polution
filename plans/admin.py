from django.contrib import admin
from .models.Goal import Goal
from .models.Plan import Plan
from tenant.utils.admin import TenantAdmin,SharedAdmin
from tenant.models import Tenant

@admin.register(Goal)
class AdminGoal(SharedAdmin):
    model = Goal

@admin.register(Plan)
class AdminPlan(SharedAdmin):
    model = Plan
