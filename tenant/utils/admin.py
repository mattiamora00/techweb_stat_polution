from django.contrib import admin
from django_tenants.utils import get_public_schema_name, get_tenant_types, get_tenant
from django.contrib.contenttypes.models import ContentType


def get_app_from_model(model):
    return model._meta.app_label


def get_tenant_permission(request, model):
    if request.tenant.schema_name == get_public_schema_name():
        tenant_type = 'public'
    else:
        tenant_type = get_tenant(request).type
    apps = get_tenant_types()[tenant_type]['APPS']
    model_app = get_app_from_model(model)
    return model_app in apps


class SharedAdmin(admin.ModelAdmin):
    '''
    Hides public models from tenants
    '''

    def has_view_permission(self, request, view=None):
        return request.tenant.schema_name == get_public_schema_name()

    def has_add_permission(self, request, view=None):
        return request.tenant.schema_name == get_public_schema_name()

    def has_change_permission(self, request, view=None):
        return request.tenant.schema_name == get_public_schema_name()

    def has_delete_permission(self, request, view=None):
        return request.tenant.schema_name == get_public_schema_name()

    def has_view_or_change_permission(self, request, view=None):
        return request.tenant.schema_name == get_public_schema_name()


class TenantAdmin(admin.ModelAdmin):
    '''
    Hides public models from tenants
    '''

    def has_view_permission(self, request, view=None):
        return get_tenant_permission(request, self.model)

    def has_add_permission(self, request, view=None):
        return get_tenant_permission(request, self.model)

    def has_change_permission(self, request, view=None):
        return get_tenant_permission(request, self.model)

    def has_delete_permission(self, request, view=None):
        return get_tenant_permission(request, self.model)

    def has_view_or_change_permission(self, request, view=None):
        return get_tenant_permission(request, self.model)
