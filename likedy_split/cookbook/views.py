from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib import messages
from .forms import CustomUserCreationForm

def home(request):
    return render(request, 'cookbook/home.html')


def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)  # Correct usage: pass request and user
            return redirect('home')  # Redirect to the home page after login
        else:
            messages.error(request, "Invalid username or password.")
    return render(request, 'cookbook/login.html')

def register_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()  # Save the user to the database
            login(request, user)  # Log the user in
            return redirect('home')  # Redirect to the home page
        else:
            # Print form errors to debug
            print(form.errors)
    else:
        form = CustomUserCreationForm()
    return render(request, 'cookbook/login.html', {'form': form})


def recipes(request):
    return HttpResponse("Hello, world. You're at the cookbook recipes.")

def profile(request):
    return HttpResponse("Hello, world. You're at the cookbook profile.")

def about(request):
    return HttpResponse("Hello, world. You're at the cookbook about.")

"""favorits, profile settings, explore, about """