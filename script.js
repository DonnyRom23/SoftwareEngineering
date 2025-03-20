document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.querySelector('.wrapper');
    const loginForm = document.querySelector('.form-box.login');
    const registerForm = document.querySelector('.form-box.register');
    const forgotPasswordForm = document.querySelector('.form-box.forgot-password');
    const closeIcon = document.querySelector('.icon-close'); // Select the "X" icon

    // Add event listener to the "X" icon
    if (closeIcon) {
        closeIcon.addEventListener('click', () => {
            // Redirect the user to the home page when "X" is clicked
            window.location.href = "home.html"; // You can change this to any other URL
        });
    }

});
// Open the modal when the "I agree to the terms & conditions" link is clicked
document.getElementById('open-terms').addEventListener('click', function(event) {
  event.preventDefault();  // Prevent the default link behavior
  const modal = document.getElementById('terms-modal');
  modal.style.display = 'block';
});

// Close the modal when the "X" is clicked
function closeModal() {
  const modal = document.getElementById('terms-modal');
  modal.style.display = 'none';
}

// Function to handle "I Agree" button click
function acceptTerms() {
  const modal = document.getElementById('terms-modal');
  modal.style.display = 'none';
  // Optionally, mark the checkbox as checked
  document.getElementById('terms-checkbox').checked = true;
}
