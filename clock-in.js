document.addEventListener('DOMContentLoaded', () => {
    // If a user is not logged in, redirect them to the login page.
    if (sessionStorage.getItem('loggedIn') !== 'true') {
        window.location.href = 'login.html';
        return; // Stop further execution
    }

    const clockInBtn = document.getElementById('clock-in-btn');

    clockInBtn.addEventListener('click', () => {
        // Here you could also record the clock-in time, e.g., in sessionStorage or by sending it to a server.
        // sessionStorage.setItem('clockInTime', new Date().toISOString());
        window.location.href = 'index.html';
    });
});