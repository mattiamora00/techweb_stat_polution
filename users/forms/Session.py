from ..models.Session import Session
from django import forms

class SessionForm(forms.ModelForm):
    class Meta:
        model=Session
        fields="__all__"