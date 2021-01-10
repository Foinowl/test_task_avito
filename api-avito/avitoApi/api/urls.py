from django.urls import path
from django.urls.conf import include

from .views import *

urlpatterns = [
  path("", AdvertList.as_view(), name="advert-list"), # all adverts data
  path("create/", AdvertCreate.as_view()),  # url for create advert
  path("advert/<int:pk>/", AdvertSearchList.as_view()) #  advert by id
]
