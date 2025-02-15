"""
URL configuration for task_tracker project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from django.contrib import admin
from django.urls import path
from task_App.views import * 
urlpatterns = [
    path('admin/', admin.site.urls),
    path('task/', TasksView.as_view() ),
    path('task/<int:pk>/', TaskViewId.as_view()),
    path('count', TasksCount.as_view()),
    path('register', UserRegistration.as_view()),
    path('login', UserLogin.as_view()),
    path('users', userlist.as_view()),
    # path('logout', UserLogout.as_view()),
    path('utask/', UserTaskView.as_view() ),
    path('utask/<int:pk>/', UserTaskViewId.as_view()),
    path('mytasks/<int:pk>/', MyTasks.as_view()),
]

