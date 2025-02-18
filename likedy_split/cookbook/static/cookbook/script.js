document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const forgotPasswordLink = document.querySelector('.forgot-password-link');
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

    if (registerLink) {
        registerLink.addEventListener('click', () => {
            // Show the register form and hide others
            loginForm.style.transform = 'translateX(500px)';
            forgotPasswordForm.style.transform = 'translateX(500px)';
            registerForm.style.transform = 'translateX(0)';
        });
    }

    if (loginLink) {
        loginLink.addEventListener('click', () => {
            // Show the login form and hide others
            loginForm.style.transform = 'translateX(0)';
            registerForm.style.transform = 'translateX(500px)';
            forgotPasswordForm.style.transform = 'translateX(500px)';
        });
    }

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', () => {
            // Show the forgot password form and hide others
            loginForm.style.transform = 'translateX(500px)';
            registerForm.style.transform = 'translateX(500px)';
            forgotPasswordForm.style.transform = 'translateX(0)';
        });
    }

    // Add event listener for login link in the forgot password form
    const loginLinkInForgotPassword = document.querySelector('.forgot-password .login-link');
    if (loginLinkInForgotPassword) {
        loginLinkInForgotPassword.addEventListener('click', () => {
            // Show the login form and hide others
            loginForm.style.transform = 'translateX(0)';
            registerForm.style.transform = 'translateX(500px)';
            forgotPasswordForm.style.transform = 'translateX(500px)';
        });
    }
});
