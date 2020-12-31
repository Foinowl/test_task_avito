from rest_framework import serializers

from .models import Ads, Gallery, Photo


class PhotoSer(serializers.ModelSerializer):
    """Для вывода изображений"""
    class Meta:
        model = Photo
        fields = ("image", )
        depth = 1



class GallerySer(serializers.ModelSerializer):
    """Для вывода галерей"""
    photos = PhotoSer(many=True, read_only=True)

    class Meta:
        model = Gallery
        fields = ["photos", ]
        depth = 1


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
        "main_img",
        "price",
        "created"
      ]



class AdvertCreateSer(serializers.Serializer):
    """Добавление объявления"""
    name = serializers.CharField(max_length=200)
    description = serializers.CharField(max_length=1000)
    images = serializers.ListField()
    price = serializers.IntegerField(default=0)

    def validate(self, data):
        """
        Check data.
        """
        if len(data['name']) > 200:
            raise serializers.ValidationError(
                "Name of Adver must be less than 200 characters")
        if len(data['description']) > 1000:
            raise serializers.ValidationError(
                "Description of Adver must be less than 1000 characters")
        if len(data['images']) > 3:
            raise serializers.ValidationError("Urls of images must be less than 3 urls")
        return data

    def create(self, validated_data):
        images_data = validated_data.pop('images')


        for img in images_data:
            Photo(image=img)
        qs_image = Photo.objects.order_by()[:len(images_data)]
        gallery = Gallery()
        gallery.save()
        for photo in qs_image:
            gallery.photos.add(photo)
        first_img = gallery.photos.order_by('created').first()
        ads = Ads.objects.create(main_img=first_img, images=gallery, **validated_data)
        return ads
