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
    username = models.CharField(_('username'), unique=True, max_length=100)
    username = models.CharField(_('first name'), max_length=100, null=True)
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
    courses = models.ManyToManyField("Course", related_name="courses_student")

    def __str__(self):
        return self.user.email


class Teacher(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='Teacher')
    CHOICES = (
        (1, 'SchoolTeacher'),
        (2, 'Student'),
        (3, 'Consultant'),
        (4, 'Select'),
    )
    avatar = models.ImageField(upload_to="Uploaded/TeacherAvatar", null=True, blank=True, default=None)
    type = models.CharField(max_length=1, choices=CHOICES, default=4, null=False)
    Semail = models.EmailField(_('email address'), null=True)
    about = models.TextField(_("about you"), null=True)

    def __str__(self):
        return self.user.email


class Course(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False)
    subject = models.CharField(max_length=100, null=False, blank=False)
    poster = models.ImageField(upload_to="Uploaded/CoursePoster", null=True, blank=True, default=None)
    capacity = models.IntegerField(null=False, blank=False, default=10)
    owner = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name="Creator", default=1)
    about_course = models.TextField(_("about course"), null=True)
    course_link_url = models.URLField(_("Course link"),  max_length=128, db_index=True, blank=True)
    grade = models.IntegerField(null=False, choices=[(x, "class {}".format(x)) for x in range(1, 13)], default=1)

    def __str__(self):
        return self.name







