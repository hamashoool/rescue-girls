from django.urls import include, path

from rest_framework_simplejwt.views import TokenRefreshView

from main_app.api import views
from main_app.api.views import MyTokenObtainPairView

urlpatterns = [
    path('', views.UserViewSet.as_view(), name="api"),
    path('login/', views.login_view),
    path('registration/', views.registration_view),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
