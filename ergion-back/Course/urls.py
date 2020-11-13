from django.urls import path, include
from .views import CourseDetail, AllCourses


urlpatterns = [
    path('', AllCourses.as_view()),
    path('<int:pk>', CourseDetail.as_view()),


    ]
