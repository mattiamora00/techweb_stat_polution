# Generated by Django 3.2.18 on 2023-05-28 10:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('geo', '0001_initial'),
        ('pollutants', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Plan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('description', models.TextField()),
                ('start_date', models.DateTimeField()),
                ('end_date', models.DateTimeField()),
                ('success', models.BooleanField()),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='geo.city')),
            ],
        ),
        migrations.CreateModel(
            name='Goal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pollutant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pollutants.pollutant')),
            ],
        ),
    ]
