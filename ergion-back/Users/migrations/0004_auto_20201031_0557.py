# Generated by Django 3.1.2 on 2020-10-31 05:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0003_auto_20201031_0531'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='username',
        ),
        migrations.RemoveField(
            model_name='student',
            name='favorites',
        ),
        migrations.RemoveField(
            model_name='student',
            name='grade',
        ),
        migrations.RemoveField(
            model_name='teacher',
            name='Course',
        ),
    ]
