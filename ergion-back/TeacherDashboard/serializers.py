from rest_framework import serializers
from Users.models import Teacher, Course, CustomUser

from rest_auth.registration.serializers import RegisterSerializer
from allauth.account.adapter import get_adapter
from allauth.utils import (email_address_exists,
                           get_username_max_length)
from allauth.account.utils import setup_user_email
from django.utils.translation import ugettext_lazy as _
from drf_extra_fields.fields import Base64ImageField as bs


class Base64ImageField(serializers.ImageField):

    def to_internal_value(self, data):
        from django.core.files.base import ContentFile
        import base64
        import six
        import uuid

        if isinstance(data, six.string_types):
            if 'data:' in data and ';base64,' in data:
                header, data = data.split(';base64,')

            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail('invalid_image')

            file_name = str(uuid.uuid4())[:12] # 12 characters are more than enough.
            file_extension = self.get_file_extension(file_name, decoded_file)
            complete_file_name = "%s.%s" % (file_name, file_extension, )
            data = ContentFile(decoded_file, name=complete_file_name)

        return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):
        import imghdr

        extension = imghdr.what(file_name, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension

        return extension


class TeacherSerializers(serializers.HyperlinkedModelSerializer):
    avatar = Base64ImageField(max_length=None, use_url=True)

    class Meta:
        model = Teacher
        fields = ['id', 'type', 'avatar', 'Semail', 'about']


class CourseSerializers(serializers.ModelSerializer):
    # owner = serializers.ReadOnlyField()
    poster = Base64ImageField(max_length=None, use_url=True, allow_null=True, required=False)

    class Meta:
        model = Course
        fields = ('id', 'owner', 'grade', 'name', 'subject', 'poster', 'capacity', 'about_course', 'grade', 'course_link_url')



# # class TeacherCoursesSerializers(serializers.ModelSerializer):
