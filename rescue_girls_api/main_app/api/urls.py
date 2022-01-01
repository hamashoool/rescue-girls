from django.urls import include, path

from rest_framework_simplejwt.views import TokenRefreshView

from main_app.api import views
from main_app.api.views import MyTokenObtainPairView

urlpatterns = [
    path('', views.UserViewSet.as_view(), name="api"),
    path('add/', views.add_savior),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('create/alert/', views.alert),
    path('create/notification/token/', views.create_notification_token),
    path('delete/', views.delete_savior),
    path('delete/alert/', views.delete_alert),
    path('get/alerts/', views.get_alerts),
    path('get/contacts/', views.get_contacts),
    path('login/', views.login_view),
    path('registration/', views.registration_view),
    path('search/', views.Search.as_view()),
    # path('search/', views.search_savior),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', views.get_user),
]
