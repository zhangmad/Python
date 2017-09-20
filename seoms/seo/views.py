from django.shortcuts import render
from django.http import HttpResponse

from . import models

def index(request):
    indexed = models.Indexed.objects.get(pk=600)
    return render(request, 'seo/index.html', {'indexed':indexed})
#    return render(request, 'seo/index.html', {'hello':'Hello, SEO management system!'})