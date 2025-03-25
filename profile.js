//profile.js

document.getElementById('upload-pic').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profile-pic').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const searchBox = document.querySelector(".search-box");
    const searchIcon = searchBox.querySelector("img");

    searchIcon.addEventListener("click", function () {
        searchBox.classList.toggle("active");
    });
});

document.body.addEventListener("click", (ev) => {
    const expandableTitleBar = ev.target.closest(".expandable_title_bar");
    if (!expandableTitleBar) {
        return;
    }

    const expandable = expandableTitleBar.closest(".expandable");
    if (expandable) {
        expandable.classList.toggle("expandable--open");
    }
});

document.addEventListener("DOMContentLoaded", function () {
  const recipesContainer = document.querySelector(".my_recipes_content");
  const favoriteRecipesContainer = document.querySelector(".favorite_recipes_content");

  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  let favoriteRecipes = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];

  function renderRecipes() {
    recipesContainer.innerHTML = "";
    if (recipes.length > 0) {
      recipes.forEach((recipe, index) => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        const isFavorite = favoriteRecipes.some(fav => fav.name === recipe.name);

        recipeCard.innerHTML = `
          <h3>${recipe.name}</h3>
          <img src="${recipe.image || 'images/default-food.png'}" alt="Recipe Image" width="100">
          <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
          <p><strong>Instructions:</strong> ${recipe.instructions}</p>
          <p><strong>Tags:</strong> ${recipe.tags}</p>
          <button class="edit-btn" data-index="${index}">Edit</button>
          <button class="favorite-btn" data-index="${index}">${isFavorite ? 'Unfavorite' : 'Favorite'}</button>
          <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        recipesContainer.appendChild(recipeCard);
      });

      addEventListeners();
    } else {
      recipesContainer.innerHTML = "<p>No recipes added yet.</p>";
    }
  }

  function renderFavoriteRecipes() {
    favoriteRecipesContainer.innerHTML = "";
    if (favoriteRecipes.length > 0) {
      favoriteRecipes.forEach((recipe, index) => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        recipeCard.innerHTML = `
          <h3>${recipe.name}</h3>
          <img src="${recipe.image || 'images/default-food.png'}" alt="Recipe Image" width="100">
          <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
          <p><strong>Instructions:</strong> ${recipe.instructions}</p>
          <p><strong>Tags:</strong> ${recipe.tags}</p>
          <button class="remove-favorite-btn" data-index="${index}">Remove</button>
        `;
        favoriteRecipesContainer.appendChild(recipeCard);
      });

      document.querySelectorAll(".remove-favorite-btn").forEach(button => {
        button.addEventListener("click", function () {
          const index = this.getAttribute("data-index");
          favoriteRecipes.splice(index, 1);
          localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
          renderFavoriteRecipes();
          renderRecipes();
        });
      });
    } else {
      favoriteRecipesContainer.innerHTML = "<p>No favorite recipes yet.</p>";
    }
  }

  function addEventListeners() {
    document.querySelectorAll(".favorite-btn").forEach(button => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        const recipe = recipes[index];

        if (favoriteRecipes.some(fav => fav.name === recipe.name)) {
          // Remove from favorites
          favoriteRecipes = favoriteRecipes.filter(fav => fav.name !== recipe.name);
        } else {
          // Add to favorites
          favoriteRecipes.push(recipe);
        }

        localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
        renderFavoriteRecipes();
        renderRecipes();
      });
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        recipes.splice(index, 1);
        localStorage.setItem("recipes", JSON.stringify(recipes));
        renderRecipes();
        renderFavoriteRecipes();
      });
    });

    document.querySelectorAll(".edit-btn").forEach(button => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        const recipe = recipes[index];
        localStorage.setItem("editRecipe", JSON.stringify({ ...recipe, index }));
        window.location.href = "addrecipe.html";
      });
    });
  }

  renderRecipes();
  renderFavoriteRecipes();
});


document.addEventListener('DOMContentLoaded', function() {
  const expandableTitleBar = document.querySelector('.expandable_title_bar');
  const expandableContentWrapper = document.querySelector('.expandable_content_wrapper');
  const addItemButton = document.querySelector('#add-item-button');
  const shoppingList = document.querySelector('#shopping-list');
  const sortOptions = document.querySelector('#sort-options');

  // Load saved shopping list from localStorage
  loadShoppingList();

  // Toggle the expandable section
  expandableTitleBar.addEventListener('click', () => {
    const isExpanded = expandableContentWrapper.style.display === 'block';
    expandableContentWrapper.style.display = isExpanded ? 'none' : 'block';
  });

  // Add a new item to the shopping list
  addItemButton.addEventListener('click', () => {
    const newItem = prompt("Enter the ingredient:");
    const newQuantity = prompt("Enter the quantity:");
    const newType = prompt("Enter the type (Fruits, Vegetables, Protein, Grain..):");

    if (newItem && newQuantity && newType) {
      const newListItem = document.createElement('li');
      newListItem.classList.add('shopping-item');
      newListItem.dataset.type = newType.toLowerCase(); // Add data attribute for filtering
      newListItem.innerHTML = `
        <input type="checkbox" class="shopping_checkbox">
        <label class="shopping_label">${newItem} (${newQuantity})</label>
        <span class="notes">Type: ${newType}</span>
        <button class="edit-button"><i class="fas fa-edit"></i></button>
        <button class="delete-button"><i class="fas fa-trash"></i></button>
      `;
      shoppingList.appendChild(newListItem);

      // Save the updated list to localStorage
      saveShoppingList();

      // Add event listeners to the new buttons
      const editButton = newListItem.querySelector('.edit-button');
      const deleteButton = newListItem.querySelector('.delete-button');

      editButton.addEventListener('click', () => {
        const editedItem = prompt("Edit the ingredient:", newItem);
        const editedQuantity = prompt("Edit the quantity:", newQuantity);
        const editedType = prompt("Edit the type:", newType);

        if (editedItem && editedQuantity && editedType) {
          newListItem.querySelector('.shopping_label').textContent = `${editedItem} (${editedQuantity})`;
          newListItem.querySelector('.notes').textContent = `Type: ${editedType}`;
          newListItem.dataset.type = editedType.toLowerCase(); // Update the type in data attribute

          // Save the updated list to localStorage
          saveShoppingList();
        }
      });

      deleteButton.addEventListener('click', () => {
        shoppingList.removeChild(newListItem);
        // Save the updated list to localStorage
        saveShoppingList();
      });
    }
  });

  // Sorting functionality
  sortOptions.addEventListener('change', (e) => {
    const sortBy = e.target.value;
    let items = Array.from(shoppingList.children);

    // If the selected sort option is not "alphabetical", we need to filter the list based on the selected category
    if (sortBy === 'alphabetical') {
      items.sort((a, b) => {
        const itemA = a.querySelector('.shopping_label').textContent.toLowerCase();
        const itemB = b.querySelector('.shopping_label').textContent.toLowerCase();
        return itemA.localeCompare(itemB);
      });
    } else {
      items = items.filter(item => item.dataset.type === sortBy.toLowerCase()); // Filter items based on selected type
    }

    // Clear the list before adding filtered items
    shoppingList.innerHTML = '';

    // Re-append the filtered (or sorted) items back to the list
    items.forEach(item => shoppingList.appendChild(item));

    // Save the updated list to localStorage
    saveShoppingList();
  });

  // Function to save the shopping list to localStorage
  function saveShoppingList() {
    const items = Array.from(shoppingList.children).map(item => {
      return {
        label: item.querySelector('.shopping_label').textContent,
        type: item.dataset.type,
        checked: item.querySelector('.shopping_checkbox').checked
      };
    });
    localStorage.setItem('shoppingList', JSON.stringify(items));
  }

  // Function to load the shopping list from localStorage
  function loadShoppingList() {
    const savedList = JSON.parse(localStorage.getItem('shoppingList'));
    if (savedList) {
      savedList.forEach(item => {
        const newListItem = document.createElement('li');
        newListItem.classList.add('shopping-item');
        newListItem.dataset.type = item.type; // Set the type for filtering
        newListItem.innerHTML = `
          <input type="checkbox" class="shopping_checkbox" ${item.checked ? 'checked' : ''}>
          <label class="shopping_label">${item.label}</label>
          <span class="notes">Type: ${item.type}</span>
          <button class="edit-button"><i class="fas fa-edit"></i></button>
          <button class="delete-button"><i class="fas fa-trash"></i></button>
        `;
        shoppingList.appendChild(newListItem);

        // Add event listeners to the new buttons
        const editButton = newListItem.querySelector('.edit-button');
        const deleteButton = newListItem.querySelector('.delete-button');

        editButton.addEventListener('click', () => {
          const editedItem = prompt("Edit the ingredient:", item.label);
          const editedQuantity = prompt("Edit the quantity:", item.label.split('(')[1].split(')')[0]);
          const editedType = prompt("Edit the type:", item.type);

          if (editedItem && editedQuantity && editedType) {
            newListItem.querySelector('.shopping_label').textContent = `${editedItem} (${editedQuantity})`;
            newListItem.querySelector('.notes').textContent = `Type: ${editedType}`;
            newListItem.dataset.type = editedType.toLowerCase(); // Update the type in data attribute

            // Save the updated list to localStorage
            saveShoppingList();
          }
        });

        deleteButton.addEventListener('click', () => {
          shoppingList.removeChild(newListItem);
          // Save the updated list to localStorage
          saveShoppingList();
        });
      });
    }
  }
});






