import uuid as uuid
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class User(AbstractUser):
    email = models.EmailField(unique=True)
    is_girl = models.BooleanField(default=False)
    is_savior = models.BooleanField(default=False)

    # USERNAME_FIELD = 'email'


class Alert(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True)
    girl = models.ForeignKey(User, on_delete=models.CASCADE, related_name='girl')
    date = models.DateTimeField(auto_now_add=True)
    is_live = models.BooleanField(default=True)

    def __str__(self):
        return f'Alert {self.girl.username} | on {self.date}'


class AlertItem(models.Model):
    alert = models.ForeignKey(Alert, on_delete=models.CASCADE)
    savior = models.ForeignKey(User, on_delete=models.CASCADE)


class Location(models.Model):
    alert = models.ForeignKey(Alert, on_delete=models.CASCADE)
    accuracy = models.FloatField(default=0.0)
    altitude = models.FloatField(default=0.0)
    altitudeAccuracy = models.FloatField(default=0.0)
    heading = models.FloatField(default=0.0)
    latitude = models.FloatField(default=0.0)
    longitude = models.FloatField(default=0.0)
    speed = models.FloatField(default=0.0)
    latitudeDelta = models.FloatField(default=0.01)
    longitudeDelta = models.FloatField(default=0.01)


class Contact(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user')
    people = models.ManyToManyField(User, related_name='people', blank=True)

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
        Contact.objects.create(user=instance)

