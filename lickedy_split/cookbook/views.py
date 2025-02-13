from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello, world. You're at the cookbook index.")

def home(request):
    return render(request, 'cookbook/home.html')

def login(request):
    return render(request, 'cookbook/login.html')

def signup(request):
    return HttpResponse("Hello, world. You're at the cookbook sign up.")

def recipes(request):
    return HttpResponse("Hello, world. You're at the cookbook recipes.")

def profile(request):
    return HttpResponse("Hello, world. You're at the cookbook profile.")

def about(request):
    return HttpResponse("Hello, world. You're at the cookbook about.")

"""favorits, profile settings, explore, about """