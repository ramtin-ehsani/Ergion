# Generated by Django 3.1.2 on 2020-11-17 08:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0005_auto_20201117_0743'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='course_url',
            field=models.CharField(blank=True, default=None, max_length=100, null=True, verbose_name='course link'),
        ),
    ]
