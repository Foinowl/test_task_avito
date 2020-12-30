from .serializers import AdvertListSer#,  # AdvertDetailSer, AdvertCreateSer
from .models import *
from rest_framework import generics
from django.http import HttpResponse

from rest_framework import serializers


def hello(request):
  return HttpResponse("Any kind of HTML Here")


class AdvertList(generics.ListAPIView):
    """Все объявления"""
    queryset = Ads.objects.all()
    serializer_class = AdvertListSer
