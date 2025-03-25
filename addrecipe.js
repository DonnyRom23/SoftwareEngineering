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
    const recipeImage = document.getElementById("recipe-image").value.trim();
    const ingredients = document.getElementById("ingredients").value.trim();
    const instructions = document.getElementById("instructions").value.trim();
    const tags = document.getElementById("tags").value.trim();

    if (recipeName && ingredients && instructions) {
      let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

      if (editRecipe) {
        // Update existing recipe
        recipes[editRecipe.index] = {
          name: recipeName,
          image: recipeImage,
          ingredients,
          instructions,
          tags
        };
        localStorage.removeItem("editRecipe"); // Clear edit flag
      } else {
        // Add new recipe
        recipes.push({ name: recipeName, image: recipeImage, ingredients, instructions, tags });
      }

      localStorage.setItem("recipes", JSON.stringify(recipes));

      alert("Recipe saved successfully!");
      window.location.href = "index.html"; // Redirect to the main page
    } else {
      alert("Please fill out all fields.");
    }
  });
});
