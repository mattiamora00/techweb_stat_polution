from ..models.State import State
from django import forms

class StateForm(forms.ModelForm):
    class Meta:
        model=State
        fields="__all__"
