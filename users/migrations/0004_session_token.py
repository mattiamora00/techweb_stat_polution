# Generated by Django 4.2 on 2023-06-07 23:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_remove_session_token'),
    ]

    operations = [
        migrations.AddField(
            model_name='session',
            name='token',
            field=models.CharField(default=1, max_length=64),
            preserve_default=False,
        ),
    ]