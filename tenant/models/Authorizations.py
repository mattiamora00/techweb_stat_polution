from django.db import models
from django.utils.translation import gettext as _


class Authorizations(models.Model):
    authorization = models.CharField(max_length=50, unique=True, verbose_name=_("Authorization Token"))

    class Meta:
        verbose_name = _("Authorization")
        verbose_name_plural = _("Authorizations")
