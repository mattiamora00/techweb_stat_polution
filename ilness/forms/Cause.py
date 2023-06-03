from ..models.Cause import Cause
from django import forms

class CauseForm(forms.ModelForm):
    class Meta:
        model=Cause
        fields="__all__"
