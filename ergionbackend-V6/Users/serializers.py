from rest_framework import serializers
from .models import CustomUser, Teacher, Student

from rest_auth.registration.serializers import RegisterSerializer
from allauth.account.adapter import get_adapter
from allauth.utils import (email_address_exists,
                           get_username_max_length)
from allauth.account.utils import setup_user_email
from django.utils.translation import ugettext_lazy as _

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email',  'role', 'firstname', 'lastname', 'phone', 'date_of_birth']


class UserRegistrationSerializer(RegisterSerializer):
    CHOICES = (
        ('T', 'Teacher'),
        ('A', 'Administration'),
        ('S', 'Student'),
    )
    role = serializers.ChoiceField(choices=CHOICES, default='S')


    email = serializers.EmailField(required=True)
    # username = serializers.CharField(required=True)
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    firstname = serializers.CharField(max_length=100)
    lastname = serializers.CharField(max_length=100)

    def validate_password1(self, password):
        return password

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError(_("the two password fields didn't match."))
        return data

    def get_cleaned_data(self):
        super(UserRegistrationSerializer, self).get_cleaned_data()
        return {
            'password': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'role': self.validated_data.get('role', ''),
            'firstname': self.validated_data.get('firstname', ''),
            'lastname': self.validated_data.get('lastname', ''),

        }

    def save(self, request):
        cleaned_data = self.get_cleaned_data()
        user = CustomUser.objects.create_user(**cleaned_data)
        if cleaned_data['role'] == 'T':
            Teacher.objects.create(user=user)
        elif cleaned_data['role'] == 'S':
            Student.objects.create(user=user)
        return user