from django.contrib.auth import authenticate
from django.shortcuts import redirect
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from main_app.api.serializers import UserSerializer, RegistrationSerializer
from main_app.models import User


class UserViewSet(ListAPIView):
    """
    API endpoint that allows users to be viewed or edited.
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    # permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return User.objects.all().order_by('-date_joined')


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def registration_view(request):
    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            data['response'] = 'Registration Successfully'
            data['email'] = serializer.data['email']
            data['username'] = serializer.data['username']
            data['Girl'] = serializer.data['is_girl']
            data['Saviour'] = serializer.data['is_savior']
            username = serializer.data['username']
            serializer.save()
            user = User.objects.get(username=username)
            token = Token.objects.get(user=user.id)
            data['Token'] = token.key
        else:
            data = serializer.errors
        return Response(data)


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def login_view(request):
    if request.method == 'POST':
        username = request.data['username']
        password = request.data['password']
        data = {}
        user = authenticate(request, username=username, password=password)
        if user is not None:
            user = User.objects.get(username=username)
            token = Token.objects.get(user=user.id)
            data['response'] = "Login Successfully"
            resp = Response(data)
            resp['Authorization'] = f'Token {token.key}'
            return resp
        else:
            data['error'] = "Invalid Info"
        return Response(data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
