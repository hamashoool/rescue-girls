from rest_framework import serializers

from main_app.models import User, Contact, Alert, Location, AlertItem


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'is_girl', 'is_superuser', 'is_savior']


class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'first_name', 'last_name', 'password', 'password2', 'is_girl', 'is_savior']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        account = User(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name'],
            is_savior=self.validated_data['is_savior'],
            is_girl=self.validated_data['is_girl'],
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password': "Passwords must match."})
        account.set_password(password)
        account.save()


class ContactSerializer(serializers.ModelSerializer):
    people = UserSerializer(read_only=True, many=True)
    user = UserSerializer(read_only=True, many=False)

    class Meta:
        model = Contact
        fields = '__all__'


class AlertSerializer(serializers.ModelSerializer):
    girl = UserSerializer(read_only=True, many=False)

    class Meta:
        model = Alert
        fields = '__all__'


class AlertItemSerializer(serializers.ModelSerializer):
    alert = AlertSerializer(read_only=True, many=False)
    user = UserSerializer(read_only=True, many=False)

    class Meta:
        model = AlertItem
        fields = '__all__'


class LocationSerializer(serializers.ModelSerializer):
    alert = AlertSerializer(read_only=True, many=False)

    class Meta:
        model = Location
        fields = '__all__'


class LocationCoordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = [
            'altitude', 'altitudeAccuracy', 'heading', 'latitude',
            'longitude', 'speed', 'latitudeDelta', 'longitudeDelta'
        ]
