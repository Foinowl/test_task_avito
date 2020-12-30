
from django.contrib import admin
from .models import Ads, Gallery, Photo


admin.site.register(Ads)
admin.site.register(Gallery)
admin.site.register(Photo)

# @admin.register(Photo)
# class PhotoAdmin(admin.ModelAdmin):
#     """Объявления"""
#     list_display = (
#         "id",
#         "image",
#         "created",
#     )


# @admin.register(Gallery)
# class GalleryAdmin(admin.ModelAdmin):
#     """Объявления"""
#     list_display = (
#         "id",
#         "photos",
#         "created",
#     )


# @admin.register(Ads)
# class AdvertAdmin(admin.ModelAdmin):
#     """Объявления"""
#     list_display = (
#         "id",
#         "name",
#         "description",
#         "images",
#         "price",
#         "created",
#     )
