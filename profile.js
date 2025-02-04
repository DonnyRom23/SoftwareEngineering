document.addEventListener("DOMContentLoaded", function () {
    const userProfile = document.getElementById("profile-pic");
    const uploadPic = document.getElementById("upload-pic");
    const welcomeMessage = document.getElementById("welcome-message");
    const username = document.getElementById("username");

    // Check if the user is returning or new
    const storedName = localStorage.getItem("username");
    if (storedName) {
        welcomeMessage.textContent = `Welcome back, ${storedName}!`;
        username.textContent = storedName;
    } else {
        const newUser = prompt("Enter your name:");
        if (newUser) {
            localStorage.setItem("username", newUser);
            welcomeMessage.textContent = `Welcome, ${newUser}!`;
            username.textContent = newUser;
        }
    }

    // Profile picture upload functionality
    uploadPic.addEventListener("change", function () {
        const file = uploadPic.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                userProfile.src = e.target.result;
                localStorage.setItem("profilePic", e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Load stored profile picture
    const storedPic = localStorage.getItem("profilePic");
    if (storedPic) {
        userProfile.src = storedPic;
    }
});

// Function to update the main content based on sidebar selection
function showContent(section) {
    const mainContent = document.getElementById("main-content");

    const content = {
        "favorites": "<h2>Favorites</h2><p>Here are your favorite recipes.</p>",
        "meal-plan": "<h2>Meal Plan</h2><p>Plan your meals here.</p>",
        "add-recipe": "<h2>Add Recipe</h2><p>Add a new recipe here.</p>",
        "recent-recipes": "<h2>Recent Recipes</h2><p>