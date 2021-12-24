import json

from django.contrib.auth import authenticate
from django.core.exceptions import ObjectDoesNotExist
from django.core.serializers import serialize
from django.db.models import Q
from rest_framework import permissions, filters
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from main_app.api.serializers import UserSerializer, RegistrationSerializer, ContactSerializer, AlertSerializer
from main_app.models import User, Contact, Alert


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


class UserViewSet(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def get_queryset(self):
        return User.objects.all().order_by('-date_joined')


class Search(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.filter(is_savior=True)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('username', 'email')


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
            username = serializer.data['username']
            serializer.save()
            user = User.objects.get(username=username)
            if user.is_savior:
                user_type = 'savior'
            elif user.is_girl:
                user_type = 'girl'
            else:
                user_type = 'none'
            token = Token.objects.get(user=user.id)
            data['Token'] = token.key
            data['name'] = user.get_full_name()
            data['user_type'] = user_type
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
            if user.is_savior:
                user_type = 'savior'
            elif user.is_girl:
                user_type = 'girl'
            else:
                user_type = 'none'
            token = Token.objects.get(user=user.id)
            data['response'] = "Login Successfully"
            data['name'] = user.get_full_name()
            data['username'] = user.username
            data['token'] = token.key
            data['user_type'] = user_type
            data['email'] = user.email
            return Response(data)
        else:
            data['error'] = "Invalid Info"
        return Response(data)


@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def get_user(request):
    if request.method == 'POST':
        token = Token.objects.get(key=request.data['token'])
        user = token.user
        data = {
            'name': user.get_full_name(),
        }
        return Response(data)


# it will return 'error' or 'success' since it is saving contact object
@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def add_savior(request):
    data = {}
    if request.method == 'POST':
        username = request.data['username']
        try:
            user = User.objects.get(username=username)
            contacts = Contact.objects.get(user=request.user)
            savior_contact = Contact.objects.get(user=user)
            if user.is_savior:
                if user in contacts.people.all():
                    data['error'] = 'This user is already in your contacts.'
                    return Response(data)
                else:
                    contacts.people.add(user)
                    savior_contact.people.add(request.user)
                    data['success'] = 'User has been added.'
            else:
                data['error'] = 'This user is not savior.'
        except ObjectDoesNotExist:
            data['error'] = 'This user does not exist.'
    return Response(data)


# it will return 'error' or 'success' since it is deleting contact object
@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def delete_savior(request):
    data = {}
    if request.method == 'POST':
        username = request.data['username']
        try:
            user = User.objects.get(username=username)
            contacts = Contact.objects.get(user=request.user)
            savior_contact = Contact.objects.get(user=user)
            if user in contacts.people.all():
                contacts.people.remove(user)
                savior_contact.people.remove(request.user)
                data['success'] = 'User has been removed.'
                return Response(data)
            else:
                data['error'] = 'This user is not in your contacts.'
        except ObjectDoesNotExist:
            data['error'] = 'This user does not exist.'
    return Response(data)


# it will return 'error' or 'success' since it is creating alert object
@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def alert(request):
    data = {}
    if request.method == 'POST':
        lat = request.data['lat']
        lon = request.data['lon']

        if not request.user.is_girl:
            data['error'] = 'You are not female.'
            return Response(data)

        contact = Contact.objects.get(user=request.user)
        people = contact.people.exclude(username=request.user.username)

        for person in people:
            Alert.objects.create(
                lat=lat,
                lon=lon,
                girl=request.user,
                savior=person
            )
        data['success'] = 'Alert has been created.'
    return Response(data)


# it will return object 'people' containing list of user objects
@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
def get_contacts(request):
    if request.method == 'GET':
        contact = Contact.objects.get(user=request.user)
        response = ContactSerializer(instance=contact).data
        return Response(response)


# it will return list of alert objects
@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
def get_alerts(request):
    if request.method == 'GET':
        if not request.user.is_savior:
            data = {'error': 'You are not savior.'}
            return Response(data)

        alerts = Alert.objects.filter(savior=request.user)
        data = AlertSerializer(alerts, many=True).data
        return Response(data)
