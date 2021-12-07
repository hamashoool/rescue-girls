from django.urls import include, path
from rest_framework import routers
from main_app.api import views

# router = routers.DefaultRouter()
# router.register(r'users', views.UserViewSet)
# router.register(r'registration', views.registration_view)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', views.UserViewSet.as_view()),
    path('registration/', views.registration_view),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
