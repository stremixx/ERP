document.addEventListener('DOMContentLoaded', () => {
    // If a user who is already logged in navigates to the login page,
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
            window.location.href = 'index.html';
        } else {
            // On failed login, show an error message.
            errorMessage.textContent = 'Invalid username or password.';
        }
    });
});