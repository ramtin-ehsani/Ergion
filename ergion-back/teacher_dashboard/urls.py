from django.urls import path, include
from allauth.account.views import confirm_email
from django.conf.urls import url
from .views import TeacherDetail, TeacherList, CourseList


urlpatterns = [
    path('teacher-profile/', TeacherDetail.as_view()),
    path('teacher-courses/', CourseList.as_view()),

    ]

