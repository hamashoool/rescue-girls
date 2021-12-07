from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from main_app.api.serializers import UserSerializer, RegistrationSerializer
from main_app.models import User


class UserViewSet(ListAPIView):
    """
    API endpoint that allows users to be viewed or edited.
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

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
            serializer.save()
        else:
            data = serializer.errors
        return Response(data)
