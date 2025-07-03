document.addEventListener('DOMContentLoaded', () => {
    // Redirect to login if not authenticated
    if (sessionStorage.getItem('loggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    // Retrieve the received order data from sessionStorage
    const receivedDataString = sessionStorage.getItem('receivedOrderData');
    if (!receivedDataString) {
        alert('No received order data found. Redirecting to dashboard.');
        window.location.href = 'index.html';
        return;
    }

    const receivedData = JSON.parse(receivedDataString);

    // Populate the information fields
    for (const key in receivedData) {
        const element = document.getElementById(`info-${key}`);
        if (element) {
            element.textContent = receivedData[key] || 'N/A';
        }
    }

    const approveBtn = document.getElementById('approve-btn');
    const rejectBtn = document.getElementById('reject-btn');

    approveBtn.addEventListener('click', () => {
        // In a real app, this would save the inspection data to a server
        alert(`Order ${receivedData.orderId} has been approved.`);
        // Clean up session storage and redirect
        sessionStorage.removeItem('receivedOrderData');
        window.location.href = 'index.html';
    });

    rejectBtn.addEventListener('click', () => {
        const reason = prompt('Please provide a reason for rejection:');
        if (reason) {
            // In a real app, this would save the inspection data and reason to a server
            alert(`Order ${receivedData.orderId} has been rejected. Reason: ${reason}`);
            // Clean up session storage and redirect
            sessionStorage.removeItem('receivedOrderData');
            window.location.href = 'index.html';
        }
    });

    // Save inspection as a listing and close the window (not redirect)
    document.getElementById('close-btn').addEventListener('click', function(e) {
        e.preventDefault();
        // Collect inspection data (add more fields as needed)
        const inspectionChecklist = document.getElementById('inspection-checklist').value;
        const inspection = {
            ...receivedData,
            inspectionChecklist,
            timestamp: new Date().toISOString()
        };
        // Save to localStorage (as an array of inspections)
        let inspections = JSON.parse(localStorage.getItem('inspections') || '[]');
        inspections.push(inspection);
        localStorage.setItem('inspections', JSON.stringify(inspections));
        // Set a flag to reopen the receive modal for this order
        sessionStorage.setItem('reopenReceiveModal', receivedData.orderId);
        // Try to close the window (works if opened via window.open)
        if (window.opener) {
            window.close();
        } else {
            // Fallback: redirect to dashboard
            window.location.href = 'index.html';
        }
    });
});