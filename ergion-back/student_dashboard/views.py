from rest_framework import generics
from course.models import Course
from users.models import CustomUser
from .serializers import StudentSerializer, AllCoursesSerializer, CoursesSerializer
from rest_framework.response import Response


class SuggestedCoursesViewSet(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = AllCoursesSerializer

    def get_queryset(self):
        custom_user = CustomUser.objects.get(pk=self.request.user.id)
        student = custom_user.Student
        user_grade = student.grade
        queryset = [course for course in Course.objects.all() if
                    (course.grade == user_grade and course not in student.courses.all())]
        return queryset


class AllCoursesViewSet(generics.ListAPIView):
    serializer_class = AllCoursesSerializer

    def get_queryset(self):
        if 'substring' in list(self.request.query_params.keys()):
            search_param = self.request.query_params['substring']
            queryset = [course for course in Course.objects.all() if (
                    (search_param.lower() in course.name.lower()) or (
                    search_param.lower() in course.instructor.user.firstname.lower() + " " + course.instructor.user.lastname.lower()) or (
                            search_param.lower() in course.subject.lower()))]
            return queryset
        return Course.objects.all()


class StudentCoursesViewSet(generics.ListAPIView, generics.UpdateAPIView):
    serializer_class = CoursesSerializer

    def get_queryset(self):
        custom_user = CustomUser.objects.get(pk=self.request.user.id)
        student_object = custom_user.Student
        queryset = student_object.courses
        return queryset

    def put(self, request, *args, **kwargs):
        if 'id' not in list(self.request.data.keys()) or len(self.request.data.keys()) > 1:
            return Response('Wrong fields', status=500)
        custom_user = CustomUser.objects.get(pk=self.request.user.id)
        student_object = custom_user.Student
        course = Course.objects.filter(pk=int(request.data.get('id'))).first()
        if course is not None:
            student_object.courses.add(course)
        serializer = self.get_serializer(student_object.courses, many=True)
        course_data = serializer.data
        return Response(course_data)


class StudentDetailsViewSet(generics.ListAPIView, generics.UpdateAPIView):
    serializer_class = StudentSerializer
    queryset = []

    def get(self, request, *args, **kwargs):
        custom_user = CustomUser.objects.get(pk=self.request.user.id)
        student_object = custom_user.Student
        queryset = [student_object, ]
        serializer = self.get_serializer(queryset, many=True)
        user_data = serializer.data[0]
        return Response(user_data)

    def get_object(self):
        custom_user = CustomUser.objects.get(pk=self.request.user.id)
        student_object = custom_user.Student
        return student_object

    def put(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=self.request.data)
        if serializer.validate(self):
            custom_user = CustomUser.objects.get(pk=request.user.id)
            student_object = custom_user.Student
            student_object.grade = request.data.get('grade', student_object.grade)
            if 'profile_picture' in list(request.data.keys()) and (
                    request.data.get('profile_picture') is None or type(request.data.get('profile_picture')) == str):
                student_object.profile_picture = None
            else:
                student_object.profile_picture = request.data.get('profile_picture', student_object.profile_picture)
            custom_user.firstname = request.data.get('firstname', custom_user.firstname)
            custom_user.lastname = request.data.get('lastname', custom_user.lastname)
            if CustomUser.objects.filter(email=request.data.get('email')).first() is None:
                custom_user.email = request.data.get('email', custom_user.email)
            student_object.save()
            custom_user.save()
            queryset = [student_object, ]
            serializer = self.get_serializer(queryset, many=True)
            user_data = serializer.data[0]
            return Response(user_data)
        else:
            return Response('Wrong fields', status=500)
