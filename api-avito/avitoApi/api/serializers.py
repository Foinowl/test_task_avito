from rest_framework import serializers

from .models import Ads, Gallery, Photo


class PhotoSer(serializers.ModelSerializer):
    """Для вывода изображений"""
    class Meta:
        model = Photo
        fields = ("image", )


class GallerySer(serializers.ModelSerializer):
    """Для вывода галерей"""
    photos = PhotoSer(many=True, read_only=True)

    class Meta:
        model = Gallery
        fields = ("photos", )

class AdvertListSer(serializers.ModelSerializer):
  """Для вывода списка объявлений"""

  images = GallerySer()
  class Meta:
      model = Ads
      fields = [
        "id",
        "name",
        "description",
        "images",
        "price",
        "created"
      ]


# class AdvertListSer(serializers.ModelSerializer):
#     """Для вывода списка объявлений"""
#     category = CategorySer()
#     filters = FilterAdvertSer()
#     images = GallerySer(read_only=True)

#     class Meta:
#         model = Advert
#         fields = ("id", "category", "filters", "subject",
#                   "images", "price", "created", "slug")
