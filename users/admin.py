from django.contrib import admin
from .models.User import User


@admin.register(User)
class AdminUser(admin.ModelAdmin):
    model = User
