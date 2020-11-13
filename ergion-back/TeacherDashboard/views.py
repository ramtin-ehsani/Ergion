from Users.models import Teacher, Course, CustomUser
from .serializers import TeacherSerializers, CourseSerializers
from rest_framework import generics, permissions
from Users.permissions import IsTeacher
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.response import Response
# Create your views here.


class TeacherList(generics.ListAPIView, LoginRequiredMixin):
    permission_classes = (IsTeacher, )
    serializer_class = TeacherSerializers

    def get_queryset(self):
        return Teacher.objects.filter(user=self.request.user)


class TeacherDetail(generics.RetrieveUpdateAPIView):
    permission_classes = (IsTeacher, )
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializers


class CourseList(generics.ListCreateAPIView):
    permission_classes = (IsTeacher, )
    queryset = Teacher.objects.all()
    serializer_class = CourseSerializers

    def perform_create(self, serializer):
        serializer.save(owner_id=Teacher.objects.filter(user=self.request.user).first().id)

    def get_queryset(self):
        custom_user = CustomUser.objects.get(pk=self.request.user.id)
        teacher_object = custom_user.Teacher
        teacher = Teacher.objects.get(pk=teacher_object.pk)
        return teacher.Creator.all()




