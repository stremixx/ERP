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
      <td><button class="receive-btn btn-action" data-orderid="${order.id}" data-inbound="${isInbound}">Receive</button></td>
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

const inboundTableBody = document.querySelector('#inbound-table tbody');
const outboundTableBody = document.querySelector('#outbound-table tbody');
const searchBar = document.getElementById('search-bar');

/**
 * Filters and renders orders based on a search term.
 * @param {string} [searchTerm=''] - The string to filter by.
 */
function filterAndRender(searchTerm = '') {
    const lowerCaseTerm = searchTerm.toLowerCase().trim();

    const filterFn = order => {
        // Search across all values of an order object for a match
        return Object.values(order).some(value =>
            String(value).toLowerCase().includes(lowerCaseTerm)
        );
    };

    const filteredInbound = inboundOrders.filter(filterFn);
    const filteredOutbound = outboundOrders.filter(filterFn);

    inboundTableBody.innerHTML = renderTableRows(filteredInbound, true);
    outboundTableBody.innerHTML = renderTableRows(filteredOutbound, false);
}

// Add event listener for the search bar to filter on input
searchBar.addEventListener('input', (e) => {
    filterAndRender(e.target.value);
});

document.querySelector('#inbound-table thead tr').innerHTML += '<th>Action</th>';
document.querySelector('#outbound-table thead tr').innerHTML += '<th>Action</th>';
filterAndRender(); // Initial render of all orders
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

  // Find the order and show info in the modal's info box
  let order = inboundOrders.find(o => o.id === orderId) || outboundOrders.find(o => o.id === orderId);
  if (order && order.info) {
    document.getElementById('order-info-box').style.display = 'block'; // Always show in modal
    document.getElementById('info-vendor').textContent = order.info.vendor;
    document.getElementById('info-mfg').textContent = order.info.mfg;
    document.getElementById('info-qty').textContent = order.info.qty;
    document.getElementById('info-trans').textContent = order.info.trans;
    document.getElementById('info-dc').textContent = order.info.dc;
    document.getElementById('info-release').textContent = order.info.release;
    document.getElementById('info-part').textContent = order.info.part;
    document.getElementById('info-condition').textContent = order.info.condition;
    document.getElementById('info-msl').textContent = order.info.msl;
    // Flow downs
    const flowUl = document.getElementById('info-flowdowns');
    flowUl.innerHTML = '';
    order.info.flowDowns.forEach(fd => {
        const li = document.createElement('li');
        li.textContent = fd;
        flowUl.appendChild(li);
    });
  }
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
// Remove or comment out this block to prevent closing the modal when clicking outside
// window.onclick = function(event) {
//   if (event.target === modal) closeModal();
// };

// Only close the modal when clicking cancel or the close button
closeModalBtn.onclick = closeModal;
cancelModalBtn.onclick = closeModal;

receiveForm.onsubmit = function(e) {
  e.preventDefault();

  // Gather all form data into an object
  const formData = new FormData(receiveForm);
  const receivedOrderData = Object.fromEntries(formData.entries());

  // Store the data in sessionStorage to pass it to the next page
  sessionStorage.setItem('receivedOrderData', JSON.stringify(receivedOrderData));

  // Redirect to the inspection page
  window.location.href = 'inspection.html';
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

// Show receive modal if coming back from inspection
const reopenOrderId = sessionStorage.getItem('reopenReceiveModal');
if (reopenOrderId) {
  setTimeout(() => {
    openModal(reopenOrderId);
    sessionStorage.removeItem('reopenReceiveModal');
  }, 500); // Wait for DOM to be ready
}

// Display inspection listings
function renderInspectionListings() {
  const inspections = JSON.parse(localStorage.getItem('inspections') || '[]');
  if (!inspections.length) return;
  let html = '<div class="inspection-listings"><h3>Completed Inspections</h3><ul>';
  inspections.forEach((insp, idx) => {
    html += `<li><a href="#" class="inspection-link" data-index="${idx}">${insp.orderId} - ${insp.receivedBy || ''} (${new Date(insp.timestamp).toLocaleString()})</a></li>`;
  });
  html += '</ul></div>';
  const main = document.querySelector('main');
  if (main) main.insertAdjacentHTML('afterbegin', html);
}
renderInspectionListings();

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('inspection-link')) {
    e.preventDefault();
    const idx = e.target.getAttribute('data-index');
    const inspections = JSON.parse(localStorage.getItem('inspections') || '[]');
    const insp = inspections[idx];
    if (insp) {
      sessionStorage.setItem('receivedOrderData', JSON.stringify(insp));
      window.location.href = 'inspection.html';
    }
  }
});

// Example flow downs pool
const FLOW_DOWNS_POOL = [
    "No early delivery allowed.",
    "Date codes must be within 12 months.",
    "Lot codes are mandatory on all packaging.",
    "Parts must be vacuum sealed.",
    "Include Certificate of Conformance.",
    "No mixed date codes.",
    "Original manufacturer packaging required.",
    "Label with customer PO number.",
    "Moisture Sensitive Level (MSL) 3 or better.",
    "No substitutions allowed.",
    "RoHS compliance required.",
    "ESD packaging mandatory.",
    "Do not ship partials.",
    "Include packing slip inside box.",
    "No backorders accepted.",
    "Parts must be lead-free.",
    "Provide traceability documents.",
    "Use FedEx for shipping.",
    "Double box all shipments.",
    "Do not ship before release date."
];

// Helper to get a random subset of flow downs
function getRandomFlowDowns() {
    const count = Math.floor(Math.random() * 4) + 2; // 2-5 flow downs
    const shuffled = FLOW_DOWNS_POOL.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Helper to generate random info fields for each order
function generateOrderInfo(order) {
    return {
        vendor: order.customer,
        mfg: ["Texas Instruments", "Analog Devices", "Microchip", "Infineon", "NXP", "STMicro", "OnSemi"][Math.floor(Math.random()*7)],
        qty: Math.floor(10 + Math.random()*990),
        trans: "TR" + Math.floor(100000 + Math.random()*900000),
        dc: "24" + String(Math.floor(Math.random()*50)).padStart(2, '0'),
        release: ["Immediate", "Scheduled", "Hold", "Backorder"][Math.floor(Math.random()*4)],
        part: "PN-" + Math.floor(10000 + Math.random()*90000),
        condition: ["Factory New", "New Surplus", "Refurbished", "Used"][Math.floor(Math.random()*4)],
        msl: "MSL-" + (Math.floor(Math.random()*6)+1),
        flowDowns: getRandomFlowDowns()
    };
}

// Attach info to each order
inboundOrders.forEach(order => order.info = generateOrderInfo(order));
outboundOrders.forEach(order => order.info = generateOrderInfo(order));

// Show info box when clicking a row
function showOrderInfoBox(order) {
    const box = document.getElementById('order-info-box');
    if (!box) return;
    document.getElementById('info-vendor').textContent = order.info.vendor;
    document.getElementById('info-mfg').textContent = order.info.mfg;
    document.getElementById('info-qty').textContent = order.info.qty;
    document.getElementById('info-trans').textContent = order.info.trans;
    document.getElementById('info-dc').textContent = order.info.dc;
    document.getElementById('info-release').textContent = order.info.release;
    document.getElementById('info-part').textContent = order.info.part;
    document.getElementById('info-condition').textContent = order.info.condition;
    document.getElementById('info-msl').textContent = order.info.msl;
    // Flow downs
    const flowUl = document.getElementById('info-flowdowns');
    flowUl.innerHTML = '';
    order.info.flowDowns.forEach(fd => {
        const li = document.createElement('li');
        li.textContent = fd;
        flowUl.appendChild(li);
    });
    box.style.display = 'block';
}

// Hide info box when clicking outside a table row
document.addEventListener('click', function(e) {
    // If clicking a table row in inbound/outbound, show info
    let tr = e.target.closest('tr');
    if (tr && (tr.parentElement.parentElement.id === 'inbound-table' || tr.parentElement.parentElement.id === 'outbound-table')) {
        // Find order by ID
        const orderId = tr.children[0]?.textContent;
        let order = inboundOrders.find(o => o.id === orderId) || outboundOrders.find(o => o.id === orderId);
        if (order) showOrderInfoBox(order);
    } 
});
