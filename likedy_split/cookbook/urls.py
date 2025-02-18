from django.urls import path
from django.contrib.auth import views as auth_views
from .views import home, login_view, register_view, recipes, profile, about

urlpatterns = [
    path('', home, name='home'),  # Home Page
    path('login/', login_view, name='login'),  # Custom Login View
    path('register/', register_view, name='register'),  # Custom Register View
    path('logout/', auth_views.LogoutView.as_view(next_page='home'), name='logout'),  # Django built-in logout
    path("recipes/", recipes, name="recipes"),
    path("profile/", profile, name="profile"),
    path("about/", about, name="about"),
]