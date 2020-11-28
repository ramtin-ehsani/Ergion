from django.db import models
from users.models import CustomUser


class Student(models.Model):
    grade = models.IntegerField(null=True, blank=True)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='Student')
    courses = models.ManyToManyField('course.Course', related_name="student_courses")
    profile_picture = models.ImageField(upload_to='images/', blank=True)

    def __str__(self):
        return self.user.email
