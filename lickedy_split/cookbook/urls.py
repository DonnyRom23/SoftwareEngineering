from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("home/", views.home, name="home"),
    path("login/", views.login, name="login"),
    path("signup/", views.signup, name="signup"),
    path("recipes/", views.recipes, name="recipes"),
    path("profile/", views.profile, name="profile"),
    path("about/", views.about, name="about"),
]

