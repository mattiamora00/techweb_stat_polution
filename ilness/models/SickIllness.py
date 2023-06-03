from django.db import models


class SickIllness(models.Model):
    sick=models.ForeignKey("Sick",on_delete=models.CASCADE)
    ilness=models.ForeignKey("Illness",on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.sick.fiscal_code} {self.ilness.nome}"