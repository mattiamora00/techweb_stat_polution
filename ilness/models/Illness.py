from django.db import models


class Illness(models.Model):
    nome = models.CharField(max_length=30, unique=True)
    mortality_index = models.IntegerField(blank=True, null=True)
    average_duration_days = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return f"{self.nome}"

    def save(self,*args, **kwargs):
        if self.average_duration_days <= 0:
            return
        super().save(self)
