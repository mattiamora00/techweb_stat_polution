# Generated by Django 4.2 on 2023-06-05 19:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('plans', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='goal',
            name='current_quantity',
        ),
        migrations.RemoveField(
            model_name='goal',
            name='goal_threshold',
        ),
    ]