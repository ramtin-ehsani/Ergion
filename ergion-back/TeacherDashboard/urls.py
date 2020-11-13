from django.urls import path, include
from allauth.account.views import confirm_email
from django.conf.urls import url
from .views import TeacherDetail, TeacherList, CourseList


urlpatterns = [
    path('profile/', TeacherList.as_view()),
    path('profile/<int:pk>', TeacherDetail.as_view()),
    path('course/', CourseList.as_view()),

    ]

