
from Users.models import Teacher, Course, CustomUser
from TeacherDashboard.serializers import TeacherSerializers, CourseSerializers
from rest_framework import generics, permissions
# Create your views here.


class CourseDetail(generics.RetrieveUpdateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    queryset = Course.objects.all()
    serializer_class = CourseSerializers


class AllCourses(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    queryset = Course.objects.all()
    serializer_class = CourseSerializers