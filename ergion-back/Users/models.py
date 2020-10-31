from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from django.contrib.postgres.fields import ArrayField
from .managers import CustomUserManager


class CustomUser(AbstractUser):
    CHOICES = (
        ('T', 'Teacher'),
        ('A', 'Administration'),
        ('S', 'Student'),
    )
    role = models.CharField(max_length=1, choices=CHOICES, default='S')

    email = models.EmailField(_('email address'), unique=True)
    # username = models.CharField(_('username'), unique=True, max_length=100)
    username = None
    firstname = models.CharField(_('first name'), max_length=100, null=True)
    lastname = models.CharField(_('last name'), max_length=100, null=True)
    phone = models.PositiveBigIntegerField(_('phone number'), unique=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()
    date_of_birth = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.email


class Student(models.Model):
    # class GradeSchool(Enum):
    #     Ad = ''
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='Student')
    # grade = models.CharField('your grade', blank=True, max_length=100)
    # favorites = ArrayField(models.CharField(_('add favorites course'), max_length=100, blank=True))

    def __str__(self):
        return self.user.email


class Teacher(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='Teacher')
    # Course = models.CharField(max_length=100)

    def __str__(self):
        return self.user.email










