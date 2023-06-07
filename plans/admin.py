from django.contrib import admin
from .models.Goal import Goal
from .models.Plan import Plan


@admin.register(Goal)
class AdminGoal(admin.ModelAdmin):
    model = Goal

@admin.register(Plan)
class AdminPlan(admin.ModelAdmin):
    model = Plan
