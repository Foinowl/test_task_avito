from django.urls import path
from django.urls.conf import include

from .views import *

urlpatterns = [
  # path('', hello)
  path("", AdvertList.as_view(), name="advert-list"),
  path("create/", AdvertCreate.as_view()),
  path("advert/<int:pk>/", AdvertSearchList.as_view())
]
