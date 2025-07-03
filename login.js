document.addEventListener('DOMContentLoaded', () => {
    const logoutMessage = document.getElementById('logout-message');

    // Check for and display the logout message popup.
    if (sessionStorage.getItem('showLogoutMessage') === 'true') {
        logoutMessage.textContent = 'You have clocked out. If done accidentally, you have a 1 minute grace period.';
        logoutMessage.style.display = 'block';

        // Clear the flag so the message doesn't appear again on refresh.
        sessionStorage.removeItem('showLogoutMessage');

        // Hide the message after 5 seconds
        setTimeout(() => {
            logoutMessage.style.display = 'none';
        }, 5000);
    }

    // If a user who is already logged in somehow navigates to the login page,
    // redirect them back to the main dashboard.
    if (sessionStorage.getItem('loggedIn') === 'true') {
        window.location.href = 'index.html';
    }

    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = loginForm.username.value;
        const password = loginForm.password.value;

        // For demonstration purposes, credentials are hardcoded.
        // In a real application, this should be a server-side check.
        if (username === 'admin' && password === 'password') {
            // On successful login, set a session flag and redirect.
            sessionStorage.setItem('loggedIn', 'true');
            window.location.href = 'clock-in.html';
        } else {
            // On failed login, show an error message.
            errorMessage.textContent = 'Invalid username or password.';
        }
    });
});