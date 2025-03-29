document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("recipe-form");

  // Check if an edit is in progress
  let editRecipe = JSON.parse(localStorage.getItem("editRecipe"));

  if (editRecipe) {
    document.getElementById("recipe-name").value = editRecipe.name;
    document.getElementById("recipe-image").value = editRecipe.image || "";
    document.getElementById("ingredients").value = editRecipe.ingredients;
    document.getElementById("instructions").value = editRecipe.instructions;
    document.getElementById("tags").value = editRecipe.tags;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const recipeName = document.getElementById("recipe-name").value.trim();
    const recipeImage = document.getElementById("recipe-image").files[0]; // Get the selected image
    const ingredients = document.getElementById("ingredients").value.trim();
    const instructions = document.getElementById("instructions").value.trim();
    const tags = document.getElementById("tags").value.trim();

    if (recipeName && ingredients && instructions) {
      let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

      // If an image is selected, read it before proceeding
      if (recipeImage) {
        const reader = new FileReader();

        reader.onload = function (e) {
          const recipeData = {
            name: recipeName,
            image: recipeImage ? e.target.result : 'images/default-food.png', // Use uploaded image or default
            ingredients,
            instructions,
            tags
          };

          if (editRecipe) {
            // Update existing recipe
            recipes[editRecipe.index] = recipeData;
            localStorage.removeItem("editRecipe"); // Clear edit flag
          } else {
            // Add new recipe
            recipes.push(recipeData);
          }

          localStorage.setItem("recipes", JSON.stringify(recipes));
          alert("Recipe saved successfully!");
          window.location.href = "index.html"; // Redirect to the main page
        };

        reader.onerror = function () {
          alert("There was an error reading the image file. Please try again.");
        };

        reader.readAsDataURL(recipeImage); // Convert image to base64 data URL
      } else {
        // If no image, save the recipe without an image
        const recipeData = {
          name: recipeName,
          image: "",  // No image provided
          ingredients,
          instructions,
          tags
        };

        if (editRecipe) {
          recipes[editRecipe.index] = recipeData;
          localStorage.removeItem("editRecipe"); // Clear edit flag
        } else {
          recipes.push(recipeData);
        }

        localStorage.setItem("recipes", JSON.stringify(recipes));
        alert("Recipe saved successfully!");
        window.location.href = "index.html"; // Redirect to the main page
      }
    } else {
      alert("Please fill out all fields.");
    }
  });
});
