from users.models import CustomUser
from .models import Teacher
from .serializers import TeacherSerializers, CourseSerializers
from rest_framework import generics, permissions
from users.permissions import IsTeacher
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.response import Response
from django.http import QueryDict


class TeacherList(generics.ListAPIView, LoginRequiredMixin):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = TeacherSerializers

    def get_queryset(self):
        return Teacher.objects.filter(user=self.request.user)


class TeacherDetail(generics.ListAPIView, generics.UpdateAPIView):
    serializer_class = TeacherSerializers

    def get(self, request, *args, **kwargs):
        custom_user = CustomUser.objects.get(pk=self.request.user.id)
        teacher_object = custom_user.Teacher
        queryset = [teacher_object, ]
        serializer = self.get_serializer(queryset, many=True)
        user_data = serializer.data[0]
        return Response(user_data)

    def get_object(self):
        custom_user = CustomUser.objects.get(pk=self.request.user.id)
        teacher_object = custom_user.Teacher
        return teacher_object

    def perform_update(self, serializer):
        custom_user = CustomUser.objects.get(pk=self.request.user.id)
        request_data = {}
        for key in list(self.request.data.keys()):
            request_data[key] = self.request.data[key]
        requested_data_query_dict = QueryDict('', mutable=True)
        requested_data_query_dict.update(request_data)
        if 'email' in list(requested_data_query_dict.keys()) and CustomUser.objects.filter(
                email=requested_data_query_dict['email']).first() is not None:
            requested_data_query_dict['email'] = custom_user.email
        if serializer.is_valid(raise_exception=True):
            serializer.update(custom_user, validated_data=requested_data_query_dict)
        serializer.save(data=requested_data_query_dict)


class CourseList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Teacher.objects.all()
    serializer_class = CourseSerializers

    def perform_create(self, serializer):
        serializer.save(instructor_id=Teacher.objects.filter(user=self.request.user).first().id)

    def get_queryset(self):
        custom_user = CustomUser.objects.get(pk=self.request.user.id)
        teacher_object = custom_user.Teacher
        teacher = Teacher.objects.get(pk=teacher_object.pk)
        return teacher.Creator.all()
