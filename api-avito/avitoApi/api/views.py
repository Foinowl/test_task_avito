from .serializers import AdvertListSer, AdvertCreateSer # AdvertDetailSer, 
from rest_framework.response import Response
from rest_framework import filters
from .models import *
from rest_framework import generics
from django.http import HttpResponse

from rest_framework import serializers
from rest_framework.views import APIView
from .pagination import PageNumberPagination


def hello(request):
  return HttpResponse("Any kind of HTML Here")


class AdvertList(generics.ListAPIView):
    """Все объявления"""
    queryset = Ads.objects.all()
    serializer_class = AdvertListSer
    pagination_class = PageNumberPagination
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['price', 'created']


class AdvertSearchList(generics.ListAPIView):
    """Все объявления"""
    serializer_class = AdvertListSer
    model = serializer_class.Meta.model


    def get_queryset(self):
        advert_id  = self.kwargs['pk']
        queryset = self.model.objects.filter(id=advert_id)
        return queryset

class AdvertCreate(APIView):
    """Добавление объявления"""

    def post(self, request):
        advert = request.data.get("advert")
        print('Advers post', advert)
        # Create an advert from the above data
        serializer = AdvertCreateSer(data=advert)
        if serializer.is_valid(raise_exception=True):
            advert_saved = serializer.save()
            return Response({"success": "Advert '{}' created successfully".format(advert_saved.id)}, status=200)