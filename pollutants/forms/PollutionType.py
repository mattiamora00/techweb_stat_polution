from..models.PollutionType import PollutionType
from django import forms

class PollutionTypeForm(forms.ModelForm):
    class Meta:
        model=PollutionType
        fields="__all__"
