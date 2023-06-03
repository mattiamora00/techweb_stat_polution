from django.db import models

class Cause(models.Model):
    illness=models.ForeignKey("Illness",on_delete=models.CASCADE)
    pollution_type = models.ForeignKey("pollutants.PollutionType", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.illness.nome} {self.pollution_type.name}"