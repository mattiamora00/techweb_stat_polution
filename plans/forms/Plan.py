from ..models.Plan import Plan
from django import forms

class PlanForm(forms.ModelForm):
    class Meta:
        model=Plan
        fields="__all__"
