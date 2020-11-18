from rest_framework import serializers
from users.models import CustomUser
from course.models import Course
from .models import Teacher
from rest_framework.settings import api_settings


class TeacherSerializers(serializers.ModelSerializer):
    firstname = serializers.CharField(source='user.firstname', required=False, read_only=True)
    lastname = serializers.CharField(source='user.lastname', required=False, read_only=True)
    email = serializers.EmailField(source='user.email', required=False, read_only=True)

    class Meta:
        model = Teacher
        fields = ['id', 'teacher_type', 'profile_picture', 'firstname', 'lastname', 'email', 'scholar_email',
                  'personal_description', 'academy_name', 'work_experience']

    def to_representation(self, data):
        data = super(TeacherSerializers, self).to_representation(data)
        request = self.context.get('request', None)
        if request.method != 'GET':
            if 'email' in list(self.initial_data.keys()):
                data['email'] = self.initial_data['email']
            if 'firstname' in list(self.initial_data.keys()):
                data['firstname'] = self.initial_data['firstname']
            if 'lastname' in list(self.initial_data.keys()):
                data['lastname'] = self.initial_data['lastname']
            if CustomUser.objects.filter(email=data['email']).first() is not None:
                custom_user = CustomUser.objects.get(pk=self.get_user_id())
                data['email'] = custom_user.email
        return data

    def get_user_id(self):
        request = self.context.get('request', None)
        if request:
            return request.user.id


class SelfFieldMixin:
    """
    Adds the self link without converting all relations to HyperlinkedRelatedField
    """

    def get_default_field_names(self, declared_fields, model_info):
        """
        Return the default list of field names that will be used if the
        `Meta.fields` option is not specified.
        """
        default_fields = super().get_default_field_names(declared_fields, model_info)
        return [self.url_field_name, *default_fields]


class CourseSerializers(serializers.ModelSerializer):
    instructor_firstname = serializers.CharField(source='instructor.user.firstname', required=False, read_only=True)
    instructor_lastname = serializers.CharField(source='instructor.user.lastname', required=False, read_only=True)
    instructor_id = serializers.IntegerField(source='instructor.user.pk', required=False, read_only=True)

    class Meta:
        model = Course
        fields = (
            'id', 'instructor_id', 'course_url',
            'instructor_firstname', 'instructor_lastname',
            'grade', 'name', 'subject', 'course_cover', 'capacity', 'about_course')

    def to_representation(self, instance):
        data = super(CourseSerializers, self).to_representation(instance)
        data['course_url'] = "/course/{}".format(instance.id)
        instance.course_url = "/course/{}".format(instance.id)
        instance.save()
        return data
