from django.db import models
from django.utils.translation import ugettext_lazy as _
from users.models import CustomUser


class Teacher(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='Teacher')
    CHOICES = (
        (1, 'SchoolTeacher'),
        (2, 'Student'),
        (3, 'Consultant'),
        (4, 'Select'),
    )
    profile_picture = models.ImageField(upload_to="Uploaded/TeacherAvatar", null=True, blank=True, default=None)
    teacher_type = models.CharField(max_length=1, choices=CHOICES, default=4, null=False)
    scholar_email = models.EmailField(_('email address'), null=True)
    personal_description = models.TextField(_("about you"), null=True)
    academy_name = models.CharField(_("academy name"), null=True, max_length=200, default=None)
    work_experience = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.user.email
