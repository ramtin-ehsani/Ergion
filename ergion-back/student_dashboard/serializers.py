from rest_framework import serializers
from course.models import Course
from .models import Student


class CoursesSerializer(serializers.HyperlinkedModelSerializer):
    instructor_id = serializers.IntegerField(source='instructor.pk', required=False)
    instructor_firstname = serializers.CharField(source='instructor.user.firstname', required=False)
    instructor_lastname = serializers.CharField(source='instructor.user.lastname', required=False)
    instructor_profile_picture = serializers.ImageField(source='instructor.profile_picture', required=False)

    class Meta:
        model = Course
        fields = (
            'id', 'instructor_id', 'instructor_firstname', 'instructor_lastname', 'instructor_profile_picture', 'name',
            'subject', 'course_cover', 'capacity', 'course_url', 'about_course', 'grade')
        read_only_fields = (
            'instructor_id', 'instructor_firstname', 'instructor_lastname', 'instructor_profile_picture', 'name',
            'subject',
            'course_cover', 'capacity', 'course_url', 'about_course', 'grade')


class StudentSerializer(serializers.HyperlinkedModelSerializer):
    firstname = serializers.CharField(source='user.firstname', required=False)
    lastname = serializers.CharField(source='user.lastname', required=False)
    email = serializers.CharField(source='user.email', required=False)

    class Meta:
        model = Student
        fields = ('firstname', 'lastname', 'id', 'grade', 'email', 'profile_picture')
        read_only_fields = ('id',)

    def validate(self, attrs):
        for field in list(self.initial_data.keys()):
            if field not in self.fields:
                return False
        return True


class AllCoursesSerializer(serializers.HyperlinkedModelSerializer):
    instructor_firstname = serializers.CharField(source='instructor.user.firstname', required=False)
    instructor_lastname = serializers.CharField(source='instructor.user.lastname', required=False)
    instructor_id = serializers.IntegerField(source='instructor.pk', required=False)
    instructor_profile_picture = serializers.ImageField(source='instructor.profile_picture', required=False)

    class Meta:
        model = Course
        fields = ('id', 'name', 'course_cover', 'course_url', 'capacity', 'instructor_firstname', 'instructor_lastname',
                  'instructor_id', 'instructor_profile_picture')
        read_only_fields = fields
