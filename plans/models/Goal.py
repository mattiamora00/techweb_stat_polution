from django.db import models

class Goal(models.Model):
    current_quantity=models.FloatField()
    goal_threshold=models.FloatField()
    plan=models.ForeignKey("Plan",on_delete=models.CASCADE)
    pollutant=models.ForeignKey('pollutants.Pollutant', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.plan.name} {self.pollutant.name}"
