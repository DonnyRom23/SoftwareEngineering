from django.contrib import admin
from django.db.models import Q
from .models import CustomUser, Ingredients, Recipes, RecipeIngredients, FavoriteRecipes, DjangoAdminLog

@admin.register(Recipes)
class RecipesAdmin(admin.ModelAdmin):
    list_display = ('name', 'uploaded_by', 'created_at')
    search_fields = ('name', 'uploaded_by__username')  # Searching by user and recipe name
    list_filter = ('created_at',)  # Filtering by creation date

    def get_search_results(self, request, queryset, search_term):
        """
        Custom search to allow filtering Recipes by ingredient names.
        """
        queryset, use_distinct = super().get_search_results(request, queryset, search_term)

        if search_term:
            # Find all recipes that have ingredients matching the search term
            ingredient_matches = Recipes.objects.filter(
                Q(recipeingredients__ingredient__name__icontains=search_term)
            )
            queryset |= ingredient_matches  # Merge with the existing search results

        return queryset.distinct(), use_distinct


@admin.register(Ingredients)
class IngredientsAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    search_fields = ('name', 'category')


@admin.register(RecipeIngredients)
class RecipeIngredientsAdmin(admin.ModelAdmin):
    list_display = ('recipe', 'ingredient')
    list_filter = ('recipe', 'ingredient')


@admin.register(FavoriteRecipes)
class FavoriteRecipesAdmin(admin.ModelAdmin):
    list_display = ('user', 'recipe')
    search_fields = ('user__username', 'recipe__name')


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'phone_number', 'created_at')
    search_fields = ('username', 'email', 'phone_number')
    list_filter = ('created_at',)


@admin.register(DjangoAdminLog)
class DjangoAdminLogAdmin(admin.ModelAdmin):
    list_display = ('action_time', 'object_repr', 'action_flag', 'user')
    list_filter = ('action_time', 'action_flag', 'user')
    search_fields = ('object_repr', 'user__username')
