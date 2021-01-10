from django.urls import path, re_path
from .views import generate_secret, get_secret


urlpatterns = [
    path('secret/', generate_secret),
    re_path(r'^secret/(?P<origin_uri>.+)$', get_secret),
]
