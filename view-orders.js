// Function to load confirmed orders from localStorage
function loadConfirmedOrders() {
    const confirmedOrdersContainer = document.getElementById("confirmed-orders-list");
    let confirmedOrders = JSON.parse(localStorage.getItem("confirmedOrders")) || [];

    // Clear previous orders
    confirmedOrdersContainer.innerHTML = '';

    // Display each confirmed order
    confirmedOrders.forEach((order, index) => {
        const orderElement = document.createElement("div");
        orderElement.classList.add("confirmed-order");
        orderElement.innerHTML = `
            <h4>Order:</h4>
            <p>Name: ${order.name}</p>
            <p>Address: ${order.address}</p>
            <p>Phone: ${order.phone}</p>
            <p>Payment Method: ${order.paymentMethod}</p>
            <p>Delivery Option: ${order.deliveryOption}</p>
            <button class="order-received-btn" data-index="${index}">Order Received</button>
            <hr>
        `;

        confirmedOrdersContainer.appendChild(orderElement);
    });

    // Add click event listener to "Order Received" buttons
    const orderReceivedButtons = document.querySelectorAll(".order-received-btn");
    orderReceivedButtons.forEach(button => {
        button.addEventListener("click", function() {
            const orderIndex = this.getAttribute("data-index");
            if (confirm("Are you sure you have received this order?")) {
                removeOrder(orderIndex);
            }
        });
    });
}

// Function to remove an order from localStorage and update the display
function removeOrder(index) {
    let confirmedOrders = JSON.parse(localStorage.getItem("confirmedOrders")) || [];
    
    // Remove the order from the array
    confirmedOrders.splice(index, 1);

    // Update localStorage
    localStorage.setItem("confirmedOrders", JSON.stringify(confirmedOrders));

    // Reload the updated list
    loadConfirmedOrders();
}

// Load confirmed orders when the page loads
window.onload = function() {
    loadConfirmedOrders();
};
