"""djProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from student_dashboard import views

urlpatterns = [
    path('api/student-courses/', views.StudentCoursesViewSet.as_view()),
    path('api/all-courses/', views.AllCoursesViewSet.as_view()),
    path('api/student-profile/', views.StudentDetailsViewSet.as_view()),
    path('api/suggested-courses/', views.SuggestedCoursesViewSet.as_view()),
]
