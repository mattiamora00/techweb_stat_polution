# Generated by Django 4.2 on 2023-06-09 15:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_alter_user_view_graph'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_image',
            field=models.FileField(blank=True, null=True, upload_to='profile_image/'),
        ),
    ]
