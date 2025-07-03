document.addEventListener('DOMContentLoaded', () => {
    // If a user is not logged in, redirect them to the login page.
    if (sessionStorage.getItem('loggedIn') !== 'true') {
        window.location.href = 'login.html';
        return; // Stop further execution
    }

    const clockInBtn = document.getElementById('clock-in-btn');
    const timeDisplay = document.getElementById('current-time');
    const dateDisplay = document.getElementById('current-date');

    /**
     * Updates the time display with the current local time.
     */
    function updateClock() {
        const now = new Date();
        // Using toLocaleTimeString for a user-friendly format (e.g., 10:30:55 PM)
        timeDisplay.textContent = now.toLocaleTimeString();
    }

    /**
     * Sets the date display with the current local date in a long format.
     */
    function setDate() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.textContent = now.toLocaleDateString(undefined, options);
    }

    // Update the clock every second.
    setInterval(updateClock, 1000);

    // Initial calls to display the clock and date immediately on page load.
    updateClock();
    setDate();

    clockInBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});