# Generated by Django 4.2 on 2023-06-05 19:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plans', '0002_remove_goal_current_quantity_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='goal',
            name='current_quantity',
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='goal',
            name='goal_threshold',
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
    ]
