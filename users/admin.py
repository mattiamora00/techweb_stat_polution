from django.contrib import admin
from .models.User import User
from tenant.utils.admin import TenantAdmin,SharedAdmin
from tenant.models import Tenant
from django_tenants.admin import TenantAdminMixin



@admin.register(User)
class AdminUser(TenantAdminMixin,admin.ModelAdmin):
    model = User
