from ..models.Sick import Sick
from django import forms

class SickForm(forms.ModelForm):
    class Meta:
        model=Sick
        fields="__all__"
