# Generated by Django 3.1.2 on 2020-11-13 13:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('course', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('grade', models.IntegerField(blank=True, null=True)),
                ('profile_picture', models.ImageField(blank=True, upload_to='images/')),
                ('courses', models.ManyToManyField(related_name='student_courses', to='course.Course')),
            ],
        ),
    ]
