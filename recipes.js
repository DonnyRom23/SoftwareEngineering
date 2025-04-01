document.addEventListener("DOMContentLoaded", function () {
    let selectedCuisine = ''; // Tracks the selected cuisine
    let selectedIngredients = []; // Stores selected ingredients
    let selectedMealType = ''; // Tracks selected meal type
    let searchQuery = ''; // Holds the search query
    let selectedDietary = ''; // Tracks selected dietary preference
    let selectedAllergen = ''; // (Unused, could be used for allergies)'


    // Function to show and hide categories when a category button is clicked
    function showCategory(categoryId) {
        const categories = ['ingredientsCategory', 'cuisinesCategory', 'mealTypeCategory', 'dietaryCategory', 'allergiesCategory'];
        categories.forEach(id => {
            const category = document.getElementById(id);
            if (category) {
                if (id === categoryId && category.style.display === 'block') {
                    category.style.display = 'none'; // Hide category if it's already visible
                } else {
                    category.style.display = (id === categoryId) ? 'block' : 'none'; // Show selected category and hide others
                }
            }
        });
    }

    // Event listeners to trigger category visibility when buttons are clicked
    document.getElementById('ingredientButton').addEventListener('click', () => {
        showCategory('ingredientsCategory');
    });

    document.getElementById('cuisinesButton').addEventListener('click', () => {
        showCategory('cuisinesCategory');
    });

    document.getElementById('mealTypeButton').addEventListener('click', () => {
        showCategory('mealTypeCategory');
    });

    document.getElementById('dietaryButton').addEventListener('click', () => {
        showCategory('dietaryCategory');
    });
    document.getElementById('allergiesButton').addEventListener('click', () => {
        showCategory('allergiesCategory'); // Show or hide allergens category
    });




    const allergenButton = document.querySelectorAll('.allergies-btn');
    allergenButton.forEach(button => {
        button.addEventListener('click', () => {
            const allergen = button.textContent;  // Use `button` here instead of `this`
            if (selectedAllergen == allergen) {
                selectedAllergen = '';
            } else {
                selectedAllergen = allergen;
            }
            updateActiveAllergen(); // Corrected function name
        });
    });


    function updateActiveAllergen() {
        allergenButton.forEach(btn => {
            if (btn.textContent === selectedAllergen) {
                btn.classList.add('active'); // Add 'active' class to selected cuisine
            } else {
                btn.classList.remove('active'); // Remove 'active' class from others
            }
        });
    }
    /**/


    // Handling clicks on cuisine buttons
    const cuisineButtons = document.querySelectorAll('.cuisineBtn');
    cuisineButtons.forEach(button => {
        button.addEventListener('click', function () {
            const cuisine = this.textContent;
            if (selectedCuisine === cuisine) {
                selectedCuisine = ''; // Unselect cuisine if already selected
            } else {
                selectedCuisine = cuisine; // Select cuisine
            }
            updateActiveCuisine(); // Update the active state for selected cuisines
        });
    });

    // Update the active state for cuisine buttons
    function updateActiveCuisine() {
        cuisineButtons.forEach(btn => {
            if (btn.textContent === selectedCuisine) {
                btn.classList.add('active'); // Add 'active' class to selected cuisine
            } else {
                btn.classList.remove('active'); // Remove 'active' class from others
            }
        });
    }

    // Handling clicks on dietary buttons
    const dietaryButtons = document.querySelectorAll('.dietary-btn');
    dietaryButtons.forEach(button => {
        button.addEventListener('click', function () {
            const dietary = this.textContent.trim().toLowerCase(); // Get dietary preference
            if (selectedDietary === dietary) {
                selectedDietary = ''; // Unselect dietary if already selected
            } else {
                selectedDietary = dietary; // Select dietary preference
            }
            updateActiveDietary(); // Update active class for selected dietary
            filterRecipes(); // Apply filter after dietary selection
        });
    });

    // Update the active state for dietary buttons
    function updateActiveDietary() {
        dietaryButtons.forEach(button => {
            if (button.textContent.trim().toLowerCase() === selectedDietary) {
                button.classList.add('active'); // Highlight selected dietary preference
            } else {
                button.classList.remove('active'); // Remove highlight from others
            }
        });
    }

// Handling clicks on meal-type buttons and trigger filtering
    const mealTypeButtons = document.querySelectorAll('.category-btn');
    mealTypeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const mealType = this.textContent;
            if (selectedMealType === mealType) {
                selectedMealType = ''; // Unselect meal type if already selected
            } else {
                selectedMealType = mealType; // Select meal type
            }
            updateActiveMealType(); // Update active class for selected meal type
            filterRecipes(); // Apply filter immediately after selection
        });
    });


    // Update the active state for meal-type buttons
    function updateActiveMealType() {
        mealTypeButtons.forEach(btn => {
            if (btn.textContent === selectedMealType) {
                btn.classList.add('active'); // Change color when selected
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Handling the dropdown for selecting veggie ingredients
    document.getElementById('veggiesDropdown').addEventListener('click', function () {
        toggleDropdown('veggiesList');
    });

    // Function to toggle visibility of dropdown lists
    function toggleDropdown(listId) {
        const list = document.getElementById(listId);
        list.style.display = list.style.display === 'block' ? 'none' : 'block'; // Toggle visibility
    }

    // List of veggie ingredients
    const veggieIngredients = ['Carrot', 'Spinach', 'Broccoli', 'Lettuce', 'Cucumber', 'Cheese', 'Potato', 'Tomato', 'Pepper', 'Zucchini', 'Mushroom', 'Eggplant', 'Onion', 'Garlic', 'Pumpkin'];

    // Load the first set of veggie ingredients into the dropdown
    function loadVeggies() {
        const container = document.getElementById('veggiesList');
        container.innerHTML = ''; // Clear existing items

        // Add first 10 veggie ingredients as buttons
        veggieIngredients.slice(0, 10).forEach(ingredient => {
            const ingredientButton = document.createElement('button');
            ingredientButton.textContent = ingredient;
            ingredientButton.classList.add('ingredient-btn');
            ingredientButton.addEventListener('click', function () {
                toggleIngredient(ingredient); // Toggle ingredient selection
            });
            container.appendChild(ingredientButton);
        });

        // Add "Show More" button
        const showMoreButton = document.createElement('button');
        showMoreButton.textContent = 'Show More';
        showMoreButton.classList.add('show-more-btn');
        showMoreButton.addEventListener('click', function () {
            loadAllVeggies(); // Load all veggie ingredients
            showMoreButton.style.display = 'none'; // Hide the "Show More" button
        });
        container.appendChild(showMoreButton);
    }

    // Function to load all veggie ingredients
    function loadAllVeggies() {
        const container = document.getElementById('veggiesList');
        veggieIngredients.forEach(ingredient => {
            const ingredientButton = document.createElement('button');
            ingredientButton.textContent = ingredient;
            ingredientButton.classList.add('ingredient-btn');
            ingredientButton.addEventListener('click', function () {
                toggleIngredient(ingredient); // Toggle ingredient selection
            });
            container.appendChild(ingredientButton);
        });
    }

    // Toggle ingredient in the selected list and update active class
    function toggleIngredient(ingredient) {
        const index = selectedIngredients.indexOf(ingredient);
        const ingredientButtons = document.querySelectorAll('.ingredient-btn');

        if (index === -1) {
            selectedIngredients.push(ingredient); // Add ingredient to selected list
        } else {
            selectedIngredients.splice(index, 1); // Remove ingredient from selected list
        }

        // Update active class for the clicked button
        ingredientButtons.forEach(button => {
            if (button.textContent === ingredient) {
                button.classList.toggle('active'); // Toggle 'active' class
            }
        });
    }

    loadVeggies();  // Initialize veggie ingredients

    // Handling the search button click
    document.querySelector('.searchButton').addEventListener('click', function () {
        searchQuery = document.querySelector('.searchInput').value.trim().toLowerCase(); // Get the search query
        hideCategoriesAndDisplayRecipes(); // Hide categories and display filtered recipes
    });

    // Handling search input for 'Enter' key press
    document.querySelector('.searchInput').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            searchQuery = document.querySelector('.searchInput').value.trim().toLowerCase(); // Get the search query
            hideCategoriesAndDisplayRecipes(); // Hide categories and display filtered recipes
        }
    });

    // Function to hide all open categories and display recipes
    function hideCategoriesAndDisplayRecipes() {
        const categories = ['ingredientsCategory', 'cuisinesCategory', 'mealTypeCategory', 'dietaryCategory' , 'allergiesCategory'];
        categories.forEach(id => {
            const category = document.getElementById(id);
            if (category) {
                category.style.display = 'none'; // Hide open categories
            }
        });

        filterRecipes(); // Apply filters and display recipes
    }

    // Function to filter recipes based on selected criteria
    function filterRecipes() {
        const recipeCards = document.querySelectorAll('.recipe-card');
        let filteredRecipes = [];
        let matchesFound = false;

        if (selectedCuisine === '' && selectedIngredients.length === 0 && selectedMealType === '' && searchQuery === '' && selectedDietary === '' &&  selectedAllergen=== '')  {
            recipeCards.forEach(card => {
                card.style.display = 'none'; // Hide all recipes if no filters are applied
            });
            return;
        }

        // Loop through each recipe card and apply filtering
        recipeCards.forEach(card => {
            const recipeName = card.querySelector('h4').textContent.toLowerCase();
            const recipeDescription = card.querySelector('.recipe-description').textContent.toLowerCase();
            const recipeIngredients = card.dataset.ingredients.toLowerCase();
            const recipeCuisines = card.dataset.cuisines.toLowerCase();
            const recipeMealType = card.dataset.mealtype.toLowerCase();
            const recipeDietary = card.dataset.dietary.toLowerCase();
            const recipeAllergen = card.dataset.allergen.toLowerCase();


            // Check if recipe matches selected filters
            const matchesCuisine = selectedCuisine ? recipeCuisines.includes(selectedCuisine.toLowerCase()) : true;
            const matchesMealType = selectedMealType ? recipeMealType.includes(selectedMealType.toLowerCase()) : true;
            const matchesIngredients = selectedIngredients.every(ingredient => recipeIngredients.includes(ingredient.toLowerCase()));
            const matchesDietary = selectedDietary ? recipeDietary.trim().toLowerCase() === selectedDietary.trim().toLowerCase() : true;
            const matchesAllergen = selectedAllergen ? recipeAllergen.includes(selectedAllergen.toLowerCase()) : true;
            const matchesSearch = searchQuery ?
                (recipeName.includes(searchQuery) ||
                    recipeDescription.includes(searchQuery) ||
                    recipeIngredients.includes(searchQuery) ||
                    recipeCuisines.includes(searchQuery) ||
                    recipeMealType.includes(searchQuery) ||
                    recipeDietary.includes(searchQuery) ||
                    recipeAllergen.includes(searchQuery))
                : true;

            // Show the card if it matches all filters
            if (matchesCuisine && matchesMealType && matchesIngredients && matchesDietary && matchesSearch && matchesAllergen ) {
                filteredRecipes.push(card);
                matchesFound = true;
            } else {
                card.style.display = 'none'; // Hide card if it doesn't match
            }
        });

        if (!matchesFound) {
            showNoResultsMessage(); // Show message if no matches found
        } else {
            hideNoResultsMessage(); // Hide no results message if matches are found
        }

        displayFilteredRecipes(filteredRecipes); // Display filtered recipes
        console.log("Selected Dietary:", selectedDietary);

    }

    // Function to display filtered recipes
    function displayFilteredRecipes(filteredRecipes) {
        const recipeCards = document.querySelectorAll('.recipe-card');
        recipeCards.forEach(card => card.style.display = 'none'); // Hide all recipes initially

        filteredRecipes.forEach(card => {
            card.style.display = 'block'; // Show the filtered recipes
        });
    }

    // Function to show 'No results' message
    function showNoResultsMessage() {
        const messageContainer = document.getElementById('noResultsMessage');
        if (messageContainer) {
            messageContainer.style.display = 'block'; // Display message
        }
    }

    // Function to hide 'No results' message
    function hideNoResultsMessage() {
        const messageContainer = document.getElementById('noResultsMessage');
        if (messageContainer) {
            messageContainer.style.display = 'none'; // Hide message
        }
    }
    const recipes = [
        {
            name: "Italian Pasta",
            image: "images/italiandish.jpg",
            description: "Classic homemade pasta tossed in a fresh tomato sauce with basil and olive oil. A simple yet flavorful dish that brings authentic Italian taste to your table.",
            prepTime: "15 mins",
            cookTime: "30 mins",
            servings: "4",
            ingredients: ["Pasta", "Tomatoes", "Basil", "Olive Oil"],
            steps: [
                "Boil pasta until al dente.",
                "Prepare tomato sauce with olive oil and basil.",
                "Mix pasta with sauce and serve."
            ],
            cuisines: ["Italian"],
            mealtype: "Main Course",
            dietary: "Vegetarian",
            allergen: "Gluten"
        },
        {
            name: "Chicken Biryani",
            image: "images/biryani.jpg",
            description: "A flavorful, spiced rice dish with chicken and aromatic herbs.",
            prepTime: "20 mins",
            cookTime: "40 mins",
            servings: "4",
            ingredients: ["Chicken", "Rice", "Spices", "Yogurt", "Herbs"],
            steps: [
                "Marinate chicken with yogurt and spices.",
                "Cook rice with aromatic herbs.",
                "Layer rice and chicken, then steam.",
                "Serve hot with raita."
            ],
            cuisines: ["Indian"],
            mealtype: "Dinner",
            dietary: "Nut-Free",
            allergen: "None"
        },
        {
            name: "Vegan Stir Fry",
            image: "images/stirfry.jpg",
            description: "A colorful and healthy mix of vegetables stir-fried with tofu.",
            prepTime: "10 mins",
            cookTime: "15 mins",
            servings: "2",
            ingredients: ["Tofu", "Broccoli", "Carrots", "Bell Peppers", "Soy Sauce"],
            steps: [
                "Cut tofu into cubes and pan-fry until golden.",
                "Chop vegetables and stir-fry in a wok.",
                "Add soy sauce and mix well.",
                "Serve with rice or noodles."
            ],
            cuisines: ["Asian"],
            mealtype: "Lunch",
            dietary: "Vegan",
            allergen: "Soy"
        },
        {
            name: "Classic Pancakes",
            image: "images/pancakes.jpg",
            description: "Fluffy and golden pancakes, perfect for breakfast.",
            prepTime: "5 mins",
            cookTime: "10 mins",
            servings: "4",
            ingredients: ["Flour", "Milk", "Eggs", "Sugar", "Baking Powder"],
            steps: [
                "Mix all ingredients to form a smooth batter.",
                "Heat a pan and pour batter to form pancakes.",
                "Cook until golden brown on both sides.",
                "Serve with syrup and fruits."
            ],
            cuisines: ["American"],
            mealtype: "Breakfast",
            dietary: "Vegetarian",
            allergen: "Dairy, Gluten"
        },
        {
            name: "Beef Tacos",
            image: "images/tacos.jpg",
            description: "Juicy seasoned beef wrapped in a soft tortilla with fresh toppings.",
            prepTime: "10 mins",
            cookTime: "15 mins",
            servings: "3",
            ingredients: ["Ground Beef", "Tortillas", "Lettuce", "Cheese", "Tomatoes", "Sour Cream"],
            steps: [
                "Cook beef with taco seasoning until browned.",
                "Warm tortillas on a skillet.",
                "Assemble tacos with beef, lettuce, cheese, and tomatoes.",
                "Serve with sour cream and salsa."
            ],
            cuisines: ["Mexican"],
            mealtype: "Dinner",
            dietary: "None",
            allergen: "Dairy"
        }
    ];



    // Function to display all recipes on the page
    function displayRecipes() {
        const container = document.getElementById('recipesContainer');
        container.innerHTML = ''; // Clear any existing content

        recipes.forEach((recipe, index) => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            recipeCard.dataset.ingredients = recipe.ingredients;
            recipeCard.dataset.cuisines = recipe.cuisines;
            recipeCard.dataset.mealtype = recipe.mealtype;
            recipeCard.dataset.dietary = recipe.dietary;
            recipeCard.dataset.allergen = recipe.allergen;

            recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <h4>${recipe.name}</h4>
            <div class="recipe-ingredient">${recipe.ingredients}</div>
            <div class="recipe-description"> ${recipe.description}</div>
            <div class="rating">⭐${recipe.rating} stars</div>
        `;

            // Add click event listener to each recipe card
            recipeCard.addEventListener('click', function () {
                // Store the selected recipe in localStorage to be used in recipe-details.html
                localStorage.setItem('selectedRecipe', JSON.stringify(recipe));
                // Redirect to recipe-details.html
                window.location.href = 'recipe-details.html'; // Or open a modal (if using same page)
            });

            container.appendChild(recipeCard);
        });

        filterRecipes(); // Reapply filters after recipes are displayed
    }


    displayRecipes(); // Initialize the recipe display on page load
});

