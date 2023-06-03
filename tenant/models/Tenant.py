from django.db import models
from django_tenants.models import TenantMixin
from django.utils.translation import gettext as _


class TenantType(models.TextChoices):
    PUBLIC = "PUBLIC", _("Public")
    CLASSIC = "CLASSIC",_("Classic")


class Tenant(TenantMixin):
    name = models.CharField(max_length=100)
    paid_until = models.DateField()
    on_trial = models.BooleanField()
    created_on = models.DateField(auto_now_add=True)
    type = models.CharField(choices=TenantType.choices, max_length=20)
    # default true, schemas will be automatically created and synced when it is saved
    auto_create_schema = True

    class Meta:
        pass
