from .serializers import AdvertListSer, AdvertCreateSer
from rest_framework.response import Response
from rest_framework import filters
from .models import *
from rest_framework import generics

from rest_framework.views import APIView
from .pagination import PageNumberPagination


class AdvertList(generics.ListAPIView):
    """All Advert"""
    queryset = Ads.objects.all()
    serializer_class = AdvertListSer
    pagination_class = PageNumberPagination
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['price', 'created']


class AdvertSearchList(generics.ListAPIView):
    """Advert by id"""
    serializer_class = AdvertListSer
    model = serializer_class.Meta.model


    def get_queryset(self):
        """
            method for search in query by id
        """
        advert_id  = self.kwargs['pk']
        queryset = self.model.objects.filter(id=advert_id)
        return queryset

class AdvertCreate(APIView):
    """Add advert"""

    def post(self, request):
        advert = request.data.get("advert")
        # Create an advert from the above data
        serializer = AdvertCreateSer(data=advert)
        if serializer.is_valid(raise_exception=True):
            advert_saved = serializer.save()
            return Response({"success": "Advert '{}' created successfully".format(advert_saved.id)}, status=200)