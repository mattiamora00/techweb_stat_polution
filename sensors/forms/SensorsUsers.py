from ..models.SensorsUsers import SensorsUsers
from django import forms

class SensorsUsersForm(forms.ModelForm):
    class Meta:
        model=SensorsUsers
        fields="__all__"
