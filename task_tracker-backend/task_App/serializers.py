from rest_framework import serializers
from .models import *
from .managers import *
from django.contrib.auth.models import update_last_login
from django.utils import timezone

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model= CustomUser
        fields = ['username', 'email', 'password']
    def create(self, validated_data):
        auth_user = CustomUser.objects.create_user(**validated_data)
        return auth_user
    # def validate_password(self, value):
    #     if len(value) < 8:
    #         raise serializers.ValidationError("Password should be at least 8 characters.")
    #     return value
class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"
        
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = "__all__"

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128, write_only=True)
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)
    last_login = serializers.DateTimeField(default=timezone.now, format='%Y-%m-%d %H:%M:%S %Z')

class UserTaskSerializer(serializers.ModelSerializer):
    class Meta :
        model= UserTasks
        fields = ['user', 'task']
     

class UserTaskViewSerializer(serializers.ModelSerializer):
    user = UsersSerializer()
    task = TaskSerializer()
    assigned_by =UsersSerializer()
    

    class Meta :
        model= UserTasks
        fields = ['id', 'user', 'task', 'assigned_by']