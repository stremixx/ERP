// Order data from src/lib/data.ts

//inbound tab area
function generateOrderId() {
    return '636' + Math.floor(100 + Math.random() * 900) + 'KC';
}

const inboundOrders = [
    { id: generateOrderId(), customer: "DIGI Key", orderDate: "2024-07-15", dueDate: "2024-07-25", status: "Pending", shippingAddress: "123 Industrial Park, Factory City, 12345", urgency: "High", orderDetails: "Urgent restock of 500 units of Part #XYZ-123. Required for critical production line." },
    { id: generateOrderId(), customer: "3M", orderDate: "2024-07-16", dueDate: "2024-08-01", status: "Processing", shippingAddress: "456 Commerce Blvd, Trade Town, 67890", urgency: "Medium", orderDetails: "Standard order of 2000 units of raw material #ABC-456." },
    { id: generateOrderId(), customer: "Supplier Gamma", orderDate: "2024-07-10", dueDate: "2024-07-20", status: "Shipped", shippingAddress: "789 Supply St, Port City, 10112", urgency: "Low", orderDetails: "Quarterly bulk order of 10,000 packaging boxes." },
    { id: generateOrderId(), customer: "Supplier Delta", orderDate: "2024-06-25", dueDate: "2024-07-10", status: "Delivered", shippingAddress: "101 Logistic Lane, Warehouse District, 13141", urgency: "Medium", orderDetails: "Order for 50 specialized machine components." },
    { id: generateOrderId(), customer: "Supplier Epsilon", orderDate: "2024-07-18", dueDate: "2024-07-22", status: "RMA", shippingAddress: "212 Distribution Dr, Cargo City, 51617", urgency: "High", orderDetails: "Cancelled due to change in project specifications." },
    { id: generateOrderId(), customer: "Supplier Zeta", orderDate: "2024-07-22", dueDate: "2024-07-30", status: "Pending", shippingAddress: "789 Industrial Ave, Factory City, 54321", urgency: "High", orderDetails: "Order for 1000 units of Part #ABC-789." },
    { id: generateOrderId(), customer: "Supplier Eta", orderDate: "2024-07-23", dueDate: "2024-08-05", status: "Processing", shippingAddress: "456 Trade Blvd, Commerce Town, 67890", urgency: "Medium", orderDetails: "Bulk order of 5000 units of raw material #XYZ-123." }
];
// this is the outbound tab area
const outboundOrders = [
    { id: generateOrderId(), customer: "Customer A", orderDate: "2024-07-20", dueDate: "2024-07-24", status: "Processing", shippingAddress: "1 Main St, Anytown, USA 12345", urgency: "High", orderDetails: "Customer requires overnight shipping. Order for custom-printed T-shirts." },
    { id: generateOrderId(), customer: "Customer B", orderDate: "2024-07-18", dueDate: "2024-07-28", status: "Pending", shippingAddress: "2 Oak Ave, Sometown, USA 67890", urgency: "Medium", orderDetails: "Standard ground shipping. Order for 10 units of Product #PROD-789." },
    { id: generateOrderId(), customer: "Customer C", orderDate: "2024-07-15", dueDate: "2024-07-19", status: "Shipped", shippingAddress: "3 Pine Ln, Otherville, USA 10112", urgency: "Medium", orderDetails: "Tracking number: 1Z9999W99999999999. Shipped via UPS." },
    { id: generateOrderId(), customer: "Customer D", orderDate: "2024-07-05", dueDate: "2024-07-12", status: "Delivered", shippingAddress: "4 Maple Ct, Anotherton, USA 13141", urgency: "Low", orderDetails: "Signed for by John Doe. Delivery confirmed." },
    { id: generateOrderId(), customer: "Customer E", orderDate: "2024-07-21", dueDate: "2024-07-26", status: "Cancelled", shippingAddress: "5 Birch Rd, Lastplace, USA 51617", urgency: "High", orderDetails: "Customer cancelled, payment refunded." },
    { id: generateOrderId(), customer: "Customer F", orderDate: "2024-07-22", dueDate: "2024-07-25", status: "Shipped", shippingAddress: "123 Elm St, Anytown, USA 12345", urgency: "Medium", orderDetails: "Order for 50 units of Product #PROD-456." },
    { id: generateOrderId(), customer: "Customer G", orderDate: "2024-07-23", dueDate: "2024-07-28", status: "Delivered", shippingAddress: "789 Pine Rd, Sometown, USA 67890", urgency: "Low", orderDetails: "Order for 200 units of Product #PROD-789." }
];

function renderTableRows(orders, isInbound = true) {
  return orders.map(order => `
    <tr>
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>${order.orderDate}</td>
      <td>${order.dueDate}</td>
      <td class="status-${order.status}">${order.status}</td>
      <td class="urgency-${order.urgency}">${order.urgency}</td>
      <td>${order.shippingAddress}</td>
      <td>${order.orderDetails}</td>
      <td><button class="receive-btn" data-orderid="${order.id}" data-inbound="${isInbound}">Receive</button></td>
    </tr>
  `).join('');
}

/**
 * Displays the recorded clock-in time in the header.
 */
function displayClockInTime() {
    const clockInTimeISO = sessionStorage.getItem('clockInTime');
    const displayElement = document.getElementById('clock-in-display');

    if (clockInTimeISO && displayElement) {
        const clockInDate = new Date(clockInTimeISO);
        // Format to a user-friendly time string like "10:30 AM"
        const formattedTime = clockInDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        displayElement.innerHTML = `Clocked In: <strong>${formattedTime}</strong>`;
    }
}

document.querySelector('#inbound-table thead tr').innerHTML += '<th>Action</th>';
document.querySelector('#outbound-table thead tr').innerHTML += '<th>Action</th>';
document.querySelector('#inbound-table tbody').innerHTML = renderTableRows(inboundOrders, true);
document.querySelector('#outbound-table tbody').innerHTML = renderTableRows(outboundOrders, false);
displayClockInTime();
// Modal logic
const modal = document.getElementById('receive-modal');
const closeModalBtn = document.getElementById('close-modal');
const cancelModalBtn = document.getElementById('cancel-modal');
const receiveForm = document.getElementById('receive-form');
let currentOrderId = null;

function openModal(orderId) {
  modal.classList.add('show');
  document.getElementById('orderId').value = orderId;
  currentOrderId = orderId;
}
function closeModal() {
  modal.classList.remove('show');
  receiveForm.reset();
  currentOrderId = null;
}

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('receive-btn')) {
    openModal(e.target.dataset.orderid);
  }
});
closeModalBtn.onclick = closeModal;
cancelModalBtn.onclick = closeModal;
window.onclick = function(event) {
  if (event.target === modal) closeModal();
};

receiveForm.onsubmit = function(e) {
  e.preventDefault();
  // You can process the form data here or send it to a server
  alert('Order ' + currentOrderId + ' received!\n' +
    'Received By: ' + receiveForm.receivedBy.value + '\n' +
    'Date: ' + receiveForm.dateReceived.value + '\n' +
    'Quantity: ' + receiveForm.quantityReceived.value + '\n' +
    'Condition: ' + receiveForm.condition.value + '\n' +
    'Notes: ' + receiveForm.notes.value);
  closeModal();
};

// Tab switching logic
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    tabContents.forEach(tc => tc.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// Logout logic
const timesheetBtn = document.getElementById('timesheet-header-btn');
timesheetBtn.addEventListener('click', () => {
    window.location.href = 'timesheet.html';
});

const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('loggedIn');
    // Record the clock-out time.
    sessionStorage.setItem('clockOutTime', new Date().toISOString());
    // Set a flag to show the logout message on the next page.
    sessionStorage.setItem('showLogoutMessage', 'true');
    window.location.href = 'login.html';
});
