# Generated by Django 4.2 on 2023-07-02 09:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0015_user_user_sensor'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='user_sensor',
        ),
    ]
