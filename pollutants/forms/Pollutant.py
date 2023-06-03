from ..models.Pollutant import Pollutant
from django import forms

class PollutantForm(forms.ModelForm):
    class Meta:
        model=Pollutant
        fields="__all__"
