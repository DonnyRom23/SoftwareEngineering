from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

class CustomUser(AbstractUser):
    bio = models.TextField(blank=True, null=True, verbose_name="Bio", help_text="A short biography of the user.")
    available_ingredients = models.TextField(blank=True, null=True, verbose_name="Available Ingredients", help_text="List of ingredients available to the user.")
    phone_number = models.CharField(max_length=15, blank=True, null=True, verbose_name="Phone Number")
    ssn = models.CharField(
        unique=True,
        max_length=11,
        blank=True,
        null=True,
        verbose_name="Social Security Number",
    )
    description = models.TextField(blank=True, null=True, verbose_name="Description")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    email = models.EmailField(unique=True, blank=True, null=True, verbose_name="Email")  # Explicit email field

    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_name="customuser_groups",
        related_query_name="customuser",
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name="customuser_permissions",
        related_query_name="customuser",
    )

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

# Ingredients Model
class Ingredients(models.Model):
    name = models.CharField(unique=True, max_length=100, verbose_name="Ingredient Name")
    category = models.CharField(max_length=100, blank=True, null=True, verbose_name="Category")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Ingredient"
        verbose_name_plural = "Ingredients"


# Recipes Model
class Recipes(models.Model):
    name = models.CharField(max_length=255, verbose_name="Recipe Name")
    description = models.TextField(blank=True, null=True, verbose_name="Description")
    instructions = models.TextField(verbose_name="Instructions")
    ingredients = models.ManyToManyField(Ingredients, through='RecipeIngredients', verbose_name="Ingredients")
    amount_favorited = models.IntegerField(default=0, verbose_name="Times Favorited")
    uploaded_by = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, blank=True, null=True, verbose_name="Uploaded By")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Recipe"
        verbose_name_plural = "Recipes"


# RecipeIngredients Model (Many-to-Many Relationship between Recipes and Ingredients)
class RecipeIngredients(models.Model):
    recipe = models.ForeignKey(Recipes, on_delete=models.CASCADE, verbose_name="Recipe")
    ingredient = models.ForeignKey(Ingredients, on_delete=models.CASCADE, verbose_name="Ingredient")

    def __str__(self):
        return f"{self.recipe.name} - {self.ingredient.name}"

    class Meta:
        verbose_name = "Recipe Ingredient"
        verbose_name_plural = "Recipe Ingredients"
        unique_together = (('recipe', 'ingredient'),)


# FavoriteRecipes Model
class FavoriteRecipes(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="User")
    recipe = models.ForeignKey(Recipes, on_delete=models.CASCADE, verbose_name="Recipe")

    def __str__(self):
        return f"{self.user.username} - {self.recipe.name}"

    class Meta:
        verbose_name = "Favorite Recipe"
        verbose_name_plural = "Favorite Recipes"
        unique_together = (('user', 'recipe'),)


# Django Admin and Content Types
class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100, verbose_name="App Label")
    model = models.CharField(max_length=100, verbose_name="Model Name")

    def __str__(self):
        return f"{self.app_label}.{self.model}"

    class Meta:
        verbose_name = "Content Type"
        verbose_name_plural = "Content Types"
        unique_together = (('app_label', 'model'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField(auto_now_add=True, verbose_name="Action Time")
    object_id = models.TextField(blank=True, null=True, verbose_name="Object ID")
    object_repr = models.CharField(max_length=200, verbose_name="Object Representation")
    action_flag = models.PositiveSmallIntegerField(verbose_name="Action Flag")
    change_message = models.TextField(verbose_name="Change Message")
    content_type = models.ForeignKey(DjangoContentType, on_delete=models.SET_NULL, blank=True, null=True, verbose_name="Content Type")
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="User")

    def __str__(self):
        return f"{self.user.username} - {self.object_repr}"

    class Meta:
        verbose_name = "Admin Log"
        verbose_name_plural = "Admin Logs"