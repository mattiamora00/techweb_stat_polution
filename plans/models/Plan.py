from django.db import models

class Plan(models.Model):
    name=models.CharField(max_length=30)
    city=models.ForeignKey("geo.City",on_delete=models.CASCADE)
    description=models.TextField(blank=True,null=True)
    start_date=models.DateTimeField()
    end_date = models.DateTimeField()
    success=models.BooleanField(blank=True,null=True,default=False)

    def __str__(self):
        return f"{self.name} {self.city.name}"