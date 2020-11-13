# Generated by Django 3.1.2 on 2020-11-06 11:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0007_course'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='students',
        ),
        migrations.AddField(
            model_name='course',
            name='about_course',
            field=models.TextField(null=True, verbose_name='about course'),
        ),
        migrations.AddField(
            model_name='course',
            name='owner',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='Creator', to='Users.teacher'),
        ),
        migrations.AddField(
            model_name='student',
            name='courses',
            field=models.ManyToManyField(related_name='courses_student', to='Users.Course'),
        ),
    ]
