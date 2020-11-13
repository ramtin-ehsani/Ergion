from rest_framework import permissions
from.models import Teacher, CustomUser
from django.utils.translation import ugettext_lazy as _


class IsTeacher(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        custom_user = CustomUser.objects.get(pk=request.user.id)
        teacher_object = custom_user.Teacher
        teacher = Teacher.objects.get(pk=teacher_object.pk)

        return obj.user == teacher

