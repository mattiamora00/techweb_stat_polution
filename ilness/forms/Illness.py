from ..models.Illness import Illness
from django import forms

class IllnessForm(forms.ModelForm):
    class Meta:
        model=Illness
        fields="__all__"
