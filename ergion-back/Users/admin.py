from django.contrib import admin

from .models import CustomUser, Teacher, Student, Course
# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Teacher)
admin.site.register(Student)
admin.site.register(Course)
