# Generated by Django 4.2 on 2023-06-05 20:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pollutants', '0003_alter_pollutant_type'),
        ('geo', '0001_initial'),
        ('sensors', '0007_alter_rilevation_sensor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sensor',
            name='city',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='geo.city'),
        ),
        migrations.AlterField(
            model_name='sensor',
            name='pollutant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='pollutants.pollutant'),
        ),
    ]