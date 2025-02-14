from django.db import models
from .managers import *
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.timezone import now

class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('employee', 'Employee')
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='employee')
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    objects = CustomUserManager()
    def __str__(self):
        return self.username
    
class Tasks(models.Model):
    task_name = models.CharField(max_length=100)
    task_description = models.CharField(max_length=500)
    STATUS_CHOICES = {
        ('pending', 'Pending'),
        ('working', 'Working'),
        ('testing', 'Testing'),
        ('completed', 'Completed'),
        ('overdue', 'Overdue')
    }
    task_status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    PRIORITY_LEVELS = {
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High')
    }
    priority = models.CharField(max_length=20, choices=PRIORITY_LEVELS, default='low')
    start_time = models.DateTimeField(blank=True, null=True)
    completed_at  = models.DateTimeField(blank=True, null=True)
    task_duration = models.DurationField(blank=True, null=True)
    deadline = models.DateTimeField(blank=True, null=True)
    def save(self, *args, **kwargs):
        if self.task_status == 'working' and self.start_time is None:
            self.start_time = now()
        if self.task_status == 'completed' and self.completed_at is None:
            self.completed_at =now()
            if self.start_time:
                self.task_duration = self.completed_at-self.start_time
        if self.deadline and self.deadline < now() and self.task_status not in ['completed', 'overdue'] :
            self.task_status = 'overdue'
        super().save(*args, **kwargs)

class UserTasks(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='assign_to')
    task = models.OneToOneField(Tasks, on_delete=models.CASCADE)
    assigned_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='assigned_by')