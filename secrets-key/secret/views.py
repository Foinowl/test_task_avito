from rest_framework.response import Response
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Secret

@csrf_exempt
def generate_secret(request):
  if request.method == 'POST':
    obj = {
        'secret': request.POST['secret'],
        'phrase': request.POST['phrase'],
    }
    if obj['secret'] and obj['phrase']:
        secret = Secret.objects.create(
            secret=obj['secret'], phrase=obj['phrase'])


        return HttpResponse(secret.secret_url)

  return HttpResponse("Any kind of HTML Here")


generate_secret.csrf_exempt = True


@csrf_exempt
def get_secret(request, origin_uri):
  print(request.GET)
  if request.method == 'POST':
    phrase_key = request.POST['phrase']
    print('ph text', phrase_key)

    result_secret = Secret.objects.get(secret_key=origin_uri)
    if result_secret.phrase == phrase_key:
      return HttpResponse(result_secret.secret)

  return HttpResponse('ITS GET METHOD')
  

get_secret.csrf_exempt = True
