# Generated by Django 3.1.2 on 2020-11-10 15:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0015_auto_20201110_1548'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='course_link_url',
            field=models.CharField(blank=True, db_index=True, max_length=128, verbose_name='Course link'),
        ),
    ]
