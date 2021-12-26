from django.urls import path

from . import consumers

websocket_urlpatterns = {
    path('ws/alert/<alert_uuid>/', consumers.AlertConsumer.as_asgi()),
}
