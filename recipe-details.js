document.addEventListener("DOMContentLoaded", function () {
  const recipeData = JSON.parse(localStorage.getItem("selectedRecipe"));

  if (!recipeData) {
    document.body.innerHTML = "<h2>Recipe not found</h2>";
    return;
  }

  document.getElementById("recipe-title").textContent = recipeData.name;
  document.getElementById("recipe-image").src = recipeData.image || "images/default-food.png";
  document.getElementById("recipe-description").textContent = recipeData.description;
  document.getElementById("recipe-tags").textContent = recipeData.tags;
  document.getElementById("recipe-ingredients").textContent = recipeData.ingredients;
  document.getElementById("recipe-instructions").textContent = recipeData.instructions;
  document.getElementById("recipe-notes").textContent = recipeData.notes;
});
