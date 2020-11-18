from users.models import CustomUser
from .models import Course
from teacher_dashboard.models import Teacher
from teacher_dashboard.serializers import CourseSerializers
from rest_framework import generics, permissions
# Create your views here.


class CourseDetail(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    queryset = Course.objects.all()
    serializer_class = CourseSerializers


class AllCourses(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    queryset = Course.objects.all()
    serializer_class = CourseSerializers
