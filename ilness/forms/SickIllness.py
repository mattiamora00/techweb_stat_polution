from ..models.SickIllness import SickIllness
from django import forms

class SickIllnessForm(forms.ModelForm):
    class Meta:
        model=SickIllness
        fields="__all__"
