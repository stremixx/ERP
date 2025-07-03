document.addEventListener('DOMContentLoaded', () => {
    // If a user is not logged in, redirect them to the login page.
    if (sessionStorage.getItem('loggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    const clockInDisplay = document.getElementById('clock-in-time');
    const clockOutDisplay = document.getElementById('clock-out-time');
    const durationDisplay = document.getElementById('total-duration');
    const backBtn = document.getElementById('back-btn');

    /**
     * Formats an ISO date string into a readable format.
     * @param {string} isoString - The ISO date string.
     * @returns {string} The formatted date and time string.
     */
    function formatTime(isoString) {
        if (!isoString) {
            return 'Not yet recorded';
        }
        const date = new Date(isoString);
        return date.toLocaleString([], {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
    }

    /**
     * Calculates the duration between two ISO date strings and formats it.
     * @param {string} startTimeISO - The start time in ISO format.
     * @param {string} endTimeISO - The end time in ISO format.
     * @returns {string} The formatted duration string (e.g., "Xh Ym Zs").
     */
    function calculateDuration(startTimeISO, endTimeISO) {
        if (!startTimeISO) {
            return 'N/A'; // Can't calculate without a start time.
        }
        if (!endTimeISO) {
            return 'Session in progress';
        }

        const startTime = new Date(startTimeISO);
        const endTime = new Date(endTimeISO);
        let durationMs = endTime - startTime;

        if (isNaN(durationMs) || durationMs < 0) {
            return 'Invalid time entry';
        }

        const hours = Math.floor(durationMs / 3600000); // 1000ms * 60s * 60m
        const minutes = Math.floor((durationMs % 3600000) / 60000); // 1000ms * 60s
        const seconds = Math.floor((durationMs % 60000) / 1000);

        return `${hours}h ${minutes}m ${seconds}s`;
    }

    // Get times from sessionStorage
    const clockInTime = sessionStorage.getItem('clockInTime');
    const clockOutTime = sessionStorage.getItem('clockOutTime');

    // Display the times
    clockInDisplay.textContent = formatTime(clockInTime);
    clockOutDisplay.textContent = formatTime(clockOutTime);
    durationDisplay.textContent = calculateDuration(clockInTime, clockOutTime);

    // Handle back button click
    backBtn.addEventListener('click', () => {
        // This will take the user to the previous page in their session history.
        window.history.back();
    });
});