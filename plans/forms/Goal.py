from ..models.Goal import Goal
from django import forms

class GoalForm(forms.ModelForm):
    class Meta:
        model=Goal
        fields="__all__"
