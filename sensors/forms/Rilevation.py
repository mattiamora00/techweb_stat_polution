from ..models.Rilevation import Rilevation
from django import forms

class RilevationForm(forms.ModelForm):
    class Meta:
        model=Rilevation
        fields="__all__"
