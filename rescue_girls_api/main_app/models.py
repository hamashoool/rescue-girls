from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(unique=True, blank=True, null=True)
    is_girl = models.BooleanField(default=False)
    is_savior = models.BooleanField(default=False)
