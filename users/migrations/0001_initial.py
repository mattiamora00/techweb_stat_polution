# Generated by Django 4.2 on 2023-06-04 08:05

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=30)),
                ('email', models.EmailField(max_length=254)),
                ('password', models.CharField(max_length=64, validators=[django.core.validators.MinValueValidator(64)])),
                ('view_sensor', models.BooleanField(default=False)),
                ('view_plan', models.BooleanField(default=False)),
                ('view_graph', models.BooleanField(default=False)),
                ('view_sick', models.BooleanField(default=False)),
            ],
        ),
    ]