from django.db import models
from teacher_dashboard.models import Teacher
from django.utils.translation import ugettext_lazy as _
from django.urls import reverse


class Course(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False)
    subject = models.CharField(max_length=100, null=False, blank=False)
    course_cover = models.ImageField(upload_to="Uploaded/CoursePoster", null=True, blank=True, default=None)
    capacity = models.IntegerField(null=False, blank=False, default=10)
    instructor = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name="Creator", default=1)
    about_course = models.TextField(_("about course"), null=True)
    course_url = models.CharField(_("course link"), max_length=100, null=True,  blank=True,
                                 default=None)
    grade = models.IntegerField(null=False, choices=[(x, "class {}".format(x)) for x in range(1, 13)], default=1)

    def __str__(self):
        return self.name
