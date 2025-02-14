from django.shortcuts import render
from rest_framework import status
from .models import *
from django.http import Http404
from .serializers import *
from django.contrib.auth import login, authenticate 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics


class TasksView(APIView):
    authentication_classes =[TokenAuthentication]
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        task_status = self.request.query_params.get('status', None)
        priority = self.request.query_params.get('priority', None)
        if task_status and priority :
            queryset = Tasks.objects.filter(task_status=task_status, priority=priority)
        elif task_status:
            queryset = Tasks.objects.filter(task_status=task_status)
        elif priority:
            queryset = Tasks.objects.filter(priority=priority)
        else:
            queryset = Tasks.objects.all()
        serializer = TaskSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def post(self, request, format=None):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class tasklistView(APIView):
#     def get(self, request, format=None):
#         queryset = Tasks.objects.filter(task_status='pending')
#         serializer = TaskSerializer(queryset, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

class TaskViewId(APIView):
    authentication_classes =[TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get_object(self, pk):
        try:
            return Tasks.objects.get(pk=pk)
        except Tasks.DoesNotExist:
            raise Http404
    def get(self, request, pk):
        queryset = self.get_object(pk)
        serializer = TaskSerializer(queryset)
        return Response(serializer.data)
    def put(self, request, pk, format=None):
        queryset = self.get_object(pk)
        serializer = TaskSerializer(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def patch(self, request, pk, format=None):
        queryset = self.get_object(pk)
        serializer = TaskSerializer(queryset, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk):
        queryset = self.get_object(pk)
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class TasksCount(APIView):
    authentication_classes =[TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        counts = {}
        task_statuses = Tasks.objects.values_list('task_status', flat=True)
        for i in task_statuses:
            count = Tasks.objects.filter(task_status=i).count()
            counts[i] = count
        counts['all'] = Tasks.objects.count()
        return Response(counts, status=status.HTTP_200_OK)
    
class UserRegistration(APIView):
    def post (self, request, format=None):
        queryset = CustomUser.objects.all()
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': 'user created successfuly'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)
    
class userlist(APIView):
    def get(self, request):
        queryset=CustomUser.objects.all()
        serializer = UsersSerializer(queryset, many=True)
        return Response(serializer.data)
    


class UserLogin(ObtainAuthToken):
    permission_classes=(AllowAny,)
    authentication_classes = [TokenAuthentication]
    def post(self, request, format=None, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, email=username, password=password)
        print(username, password)
        print(user)
        if user is not None:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)     
            # if created:
            #     token.delete()
            #     token = Token.objects.create(user=user)
            response_data = {
                'success': True,
                'statusCode': status.HTTP_200_OK,
                'message': 'User logged in successfully',
                'access': token.key,
                'id': user.id,
                'role': user.role,
            }
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

# class UserLogout(APIView):
#     authentication_classes =[TokenAuthentication]
#     permission_classes = [IsAuthenticated]
#     def post(self, request):
#         token_key = request.auth.key
#         token=Token.objects.get(key=token_key)
#         token.delete()
#         return Response({'user logge out succesfully'})
    
class UserTaskView(generics.ListCreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = UserTasks.objects.all()

    def get_serializer_class(self):
        # Use different serializers based on the HTTP method
        if self.request.method == 'GET':
            return UserTaskViewSerializer  # Serializer for GET
        return UserTaskSerializer  # Serializer for POST
    
    def perform_create(self, serializer):
        # Automatically assign the current user as the 'assigned_by' field
        serializer.save(assigned_by=self.request.user)



class UserTaskViewId(APIView):
    authentication_classes =[TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get_object(self, pk):
        try:
            return UserTasks.objects.get(task=pk)
        except UserTasks.DoesNotExist:
            raise Http404
    def get(self, request, pk):
        queryset = self.get_object(pk)
        serializer = UserTaskViewSerializer(queryset)
        return Response(serializer.data)
    def patch(self, request, pk, format=None):
        queryset = self.get_object(pk)
        serializer = UserTaskSerializer(queryset, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MyTasks(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    def get(self, request, pk, format=None):
        queryset = UserTasks.objects.filter(user=pk)
        serializer= UserTaskViewSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

