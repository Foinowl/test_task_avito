from django.db import models

import uuid
import base64


HOST_NAME = 'http://localhost:8000/'


class Secret(models.Model):
  secret = models.TextField(max_length=10000, blank=True,)
  phrase = models.CharField(max_length=100, blank=True)
  secret_key = models.CharField(max_length=30, unique=True, db_index=True)
  secret_url = models.URLField(max_length=256, blank=True, null=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)


  def save(self, *args, **kwargs):
    self.secret_key = self.generate_secret()
    self.secret_url = self.create_secret_url()
    super(Secret, self).save(*args, **kwargs)


  def generate_secret(self):
      hash = base64.urlsafe_b64encode(uuid.uuid1().bytes)[:6]
      hash_exist = Secret.objects.filter(secret_key=hash)
      while hash_exist:
          hash = base64.urlsafe_b64encode(uuid.uuid1().bytes)[:6]
          hash_exist = Secret.objects.filter(secret_key=hash)
          continue
      hash = hash.decode('utf-8')

      return hash

  def create_secret_url(self):
      return HOST_NAME + 'secret/' + self.secret_key

