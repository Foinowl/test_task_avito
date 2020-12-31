from django.db import models


class Photo(models.Model):
    """Фото"""
    image = models.URLField()
    created = models.DateTimeField("Дата создания", auto_now_add=True)

    def __str__(self):
        return self.image

    class Meta:
        verbose_name = "Изображение"
        verbose_name_plural = "Изображения"


class Gallery(models.Model):
    """Галерея"""
    photos = models.ManyToManyField(Photo, verbose_name="Фотографии")
    created = models.DateTimeField("Дата создания", auto_now_add=True)

    class Meta:
        verbose_name = "Галерея"
        verbose_name_plural = "Галереи"



class Ads(models.Model):
    """Объявление"""
    name = models.CharField(max_length=200, unique=True)
    description = models.TextField(max_length=1000, unique=True)
    main_img = models.URLField(null=True)
    images = models.ForeignKey(
        Gallery,
        verbose_name="Изображения",
        blank=True,
        null=True,
        on_delete=models.SET_NULL
    )
    price = models.IntegerField(default=0)
    created = models.DateTimeField("Дата создания", auto_now_add=True)


    def __str__(self):
        return self.name
