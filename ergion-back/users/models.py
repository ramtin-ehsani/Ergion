from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from .managers import CustomUserManager


class CustomUser(AbstractUser):
    CHOICES = (
        ('T', 'Teacher'),
        ('A', 'Administration'),
        ('S', 'Student'),
    )
    role = models.CharField(max_length=1, choices=CHOICES, default='S')
    email = models.EmailField(_('email address'), unique=True)
    username = models.CharField(_('username'), max_length=100, null=True)
    firstname = models.CharField(_('first name'), max_length=100, null=True)
    lastname = models.CharField(_('last name'), max_length=100, null=True)
    phone = models.PositiveBigIntegerField(_('phone number'), unique=True, null=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = CustomUserManager()
    date_of_birth = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.email







