from django.urls import path

from main_app import views as v

urlpatterns = [
    path('', v.redirect_view, name='redirect_view'),
]
