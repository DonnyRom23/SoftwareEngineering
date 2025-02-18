document.addEventListener("DOMContentLoaded", function () {
    let selectedCuisine = '';
    let selectedIngredients = [];
    let selectedMealType = ''; // Track selected meal type
    let searchQuery = '';

    // Function to show and hide categories
    function showCategory(categoryId) {
        const categories = ['ingredientsCategory', 'cuisinesCategory', 'mealTypeCategory'];
        categories.forEach(id => {
            const category = document.getElementById(id);
            if (category) {
                if (id === categoryId && category.style.display === 'block') {
                    category.style.display = 'none';
                } else {
                    category.style.display = (id === categoryId) ? 'block' : 'none';
                }
            }
        });
    }

    // Event listeners for buttons to show categories
    document.getElementById('ingredientButton').addEventListener('click', () => {
        showCategory('ingredientsCategory');
    });

    document.getElementById('cuisinesButton').addEventListener('click', () => {
        showCategory('cuisinesCategory');
    });

    document.getElementById('mealTypeButton').addEventListener('click', () => {
        showCategory('mealTypeCategory');
    });

    // *** Cuisines Button Click ***
    const cuisineButtons = document.querySelectorAll('.cuisineBtn');
    cuisineButtons.forEach(button => {
        button.addEventListener('click', function () {
            const cuisine = this.textContent;
            if (selectedCuisine === cuisine) {
                selectedCuisine = ''; // Unselect cuisine if it's already selected
            } else {
                selectedCuisine = cuisine; // Select cuisine
            }
            updateActiveCuisine(); // Update active class for selected cuisines
        });
    });

    function updateActiveCuisine() {
        cuisineButtons.forEach(btn => {
            if (btn.textContent === selectedCuisine) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // *** Meal-Type Button Click ***
    const mealTypeButtons = document.querySelectorAll('.category-btn'); // Ensure this matches your button class
    mealTypeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const mealType = this.textContent;
            if (selectedMealType === mealType) {
                selectedMealType = ''; // Unselect meal type if it's already selected
            } else {
                selectedMealType = mealType; // Select meal type
            }
            updateActiveMealType(); // Update active class for selected meal types
        });
    });

    function updateActiveMealType() {
        mealTypeButtons.forEach(btn => {
            if (btn.textContent === selectedMealType) {
                btn.classList.add('active'); // Change color when selected
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // *** Ingredients Button Click ***
    document.getElementById('veggiesDropdown').addEventListener('click', function () {
        toggleDropdown('veggiesList');
    });

    function toggleDropdown(listId) {
        const list = document.getElementById(listId);
        list.style.display = list.style.display === 'block' ? 'none' : 'block';
    }

    const veggieIngredients = ['Carrot', 'Spinach', 'Broccoli', 'Lettuce', 'Cucumber', 'Cheese', 'Potato', 'Tomato', 'Pepper', 'Zucchini', 'Mushroom', 'Eggplant', 'Onion', 'Garlic', 'Pumpkin'];

    function loadVeggies() {
        const container = document.getElementById('veggiesList');
        container.innerHTML = '';

        // Display first 10 ingredients
        veggieIngredients.slice(0, 10).forEach(ingredient => {
            const ingredientButton = document.createElement('button');
            ingredientButton.textContent = ingredient;
            ingredientButton.classList.add('ingredient-btn');
            ingredientButton.addEventListener('click', function () {
                toggleIngredient(ingredient);
            });
            container.appendChild(ingredientButton);
        });

        // Add the "Show More" button
        const showMoreButton = document.createElement('button');
        showMoreButton.textContent = 'Show More';
        showMoreButton.classList.add('show-more-btn');
        showMoreButton.addEventListener('click', function () {
            loadAllVeggies();
            showMoreButton.style.display = 'none'; // Hide the "Show More" button
        });
        container.appendChild(showMoreButton);
    }

    function loadAllVeggies() {
        const container = document.getElementById('veggiesList');
        veggieIngredients.forEach(ingredient => {
            const ingredientButton = document.createElement('button');
            ingredientButton.textContent = ingredient;
            ingredientButton.classList.add('ingredient-btn');
            ingredientButton.addEventListener('click', function () {
                toggleIngredient(ingredient);
            });
            container.appendChild(ingredientButton);
        });
    }

    function toggleIngredient(ingredient) {
        const index = selectedIngredients.indexOf(ingredient);
        const ingredientButtons = document.querySelectorAll('.ingredient-btn');

        // Toggle ingredient in the selected list
        if (index === -1) {
            selectedIngredients.push(ingredient);
        } else {
            selectedIngredients.splice(index, 1);
        }

        // Update active class for the clicked button
        ingredientButtons.forEach(button => {
            if (button.textContent === ingredient) {
                button.classList.toggle('active'); // Toggle 'active' class
            }
        });
    }

    loadVeggies();  // Load the ingredient buttons

    // *** Search Button Click ***
    document.querySelector('.searchButton').addEventListener('click', function () {
        searchQuery = document.querySelector('.searchInput').value.trim().toLowerCase();
        hideCategoriesAndDisplayRecipes(); // Hide categories and display recipes
    });

    document.querySelector('.searchInput').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            searchQuery = document.querySelector('.searchInput').value.trim().toLowerCase();
            hideCategoriesAndDisplayRecipes(); // Hide categories and display recipes
        }
    });

    // Function to hide any open category and display recipes
    function hideCategoriesAndDisplayRecipes() {
        // Hide any open category
        const categories = ['ingredientsCategory', 'cuisinesCategory', 'mealTypeCategory'];
        categories.forEach(id => {
            const category = document.getElementById(id);
            if (category) {
                category.style.display = 'none';
            }
        });

        // Display recipes based on current filters
        filterRecipes();
    }

    // *** Filter Recipes Based on Criteria ***
    function filterRecipes() {
        const recipeCards = document.querySelectorAll('.recipe-card');
        let filteredRecipes = [];
        let matchesFound = false;

        if (selectedCuisine === '' && selectedIngredients.length === 0 && selectedMealType === '' && searchQuery === '') {
            recipeCards.forEach(card => {
                card.style.display = 'none';
            });
            return;
        }

        recipeCards.forEach(card => {
            const recipeName = card.querySelector('h4').textContent.toLowerCase();
            const recipeDescription = card.querySelector('.recipe-description').textContent.toLowerCase();
            const recipeIngredients = card.dataset.ingredients.toLowerCase();
            const recipeCuisines = card.dataset.cuisines.toLowerCase();
            const recipeMealType = card.dataset.mealtype.toLowerCase(); // Added mealType data

            // Check for match in cuisine, ingredients, meal type, and search term
            const matchesCuisine = selectedCuisine ? recipeCuisines.includes(selectedCuisine.toLowerCase()) : true;
            const matchesMealType = selectedMealType ? recipeMealType.includes(selectedMealType.toLowerCase()) : true;
            const matchesIngredients = selectedIngredients.every(ingredient => recipeIngredients.includes(ingredient.toLowerCase()));
            const matchesSearch = searchQuery ?
                (recipeName.includes(searchQuery) ||
                    recipeDescription.includes(searchQuery) ||
                    recipeIngredients.includes(searchQuery) ||
                    recipeCuisines.includes(searchQuery) ||
                    recipeMealType.includes(searchQuery)) // Checking search query against meal type as well
                : true;

            // Show the card if all conditions are met
            if (matchesCuisine && matchesMealType && matchesIngredients && matchesSearch) {
                filteredRecipes.push(card);
                matchesFound = true;
            } else {
                card.style.display = 'none';
            }
        });

        if (!matchesFound) {
            showNoResultsMessage();
        } else {
            hideNoResultsMessage();
        }

        displayFilteredRecipes(filteredRecipes);
    }

    // Function to display filtered recipes
    function displayFilteredRecipes(filteredRecipes) {
        const recipeCards = document.querySelectorAll('.recipe-card');
        recipeCards.forEach(card => card.style.display = 'none'); // Hide all recipes initially

        filteredRecipes.forEach(card => {
            card.style.display = 'block'; // Show the filtered recipes
        });
    }

    // Function to show no results message
    function showNoResultsMessage() {
        const messageContainer = document.getElementById('noResultsMessage');
        if (messageContainer) {
            messageContainer.style.display = 'block';
        }
    }

    // Function to hide no results message
    function hideNoResultsMessage() {
        const messageContainer = document.getElementById('noResultsMessage');
        if (messageContainer) {
            messageContainer.style.display = 'none';
        }
    }

    // Dummy recipe data with meal type
    const recipes = [
        {
            name: "Spaghetti Carbonara",
            image: "https://via.placeholder.com/250x150",
            rating: 4.5,
            description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
            ingredients: "Pasta, eggs, pancetta, cheese, pepper, rice",
            cuisines: "Italian",
            mealtype: "Lunch"
        },
        {
            name: "Chicken Biryani",
            image: "https://via.placeholder.com/250x150",
            rating: 4.8,
            description: "A flavorful, spiced rice dish with chicken and aromatic herbs.",
            ingredients: "Chicken, rice, spices, yogurt, herbs, cheese",
            cuisines: "Indian",
            mealtype: "Dinner"
        },
        // Other recipes here...
    ];

    // Display all recipes
    function displayRecipes() {
        const container = document.getElementById('recipesContainer');
        container.innerHTML = '';

        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            recipeCard.dataset.ingredients = recipe.ingredients;
            recipeCard.dataset.cuisines = recipe.cuisines;
            recipeCard.dataset.mealtype = recipe.mealtype;

            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}">
                <h4>${recipe.name}</h4>
                <div class="recipe-description">${recipe.description}</div>
                <div class="rating">⭐${recipe.rating} stars</div>
            `;

            container.appendChild(recipeCard);
        });

        filterRecipes(); // Reapply filters after loading recipes
    }

    displayRecipes(); // Initialize the recipe display on page load
});
