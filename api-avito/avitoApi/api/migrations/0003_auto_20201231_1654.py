# Generated by Django 3.1.2 on 2020-12-31 12:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_ads_main_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ads',
            name='main_img',
            field=models.URLField(null=True),
        ),
    ]