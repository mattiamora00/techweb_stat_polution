from ..models.Sensor import Sensor
from django import forms

class SensorForm(forms.ModelForm):
    class Meta:
        model=Sensor
        fields="__all__"
