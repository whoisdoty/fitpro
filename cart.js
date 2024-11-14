// Function to load cart items from localStorage
function loadCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    // Get the cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = 0;

    // Clear the previous items
    cartItemsContainer.innerHTML = '';

    // Display each cart item
    cartItems.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <p>${item.name} - ${item.price} (Quantity: ${item.quantity})</p>
            <button class="remove-button" onclick="removeCartItem(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
        totalPrice += item.price * item.quantity; // Calculate total price
    });

    // Display total price
    totalPriceElement.innerText = `Total Price: ${totalPrice.toFixed(2)}`;
}

// Function to remove an item from the cart
function removeCartItem(index) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.splice(index, 1); // Remove the item from the cart
    localStorage.setItem("cart", JSON.stringify(cartItems)); // Update localStorage
    loadCartItems(); // Reload the cart items
}

// Function to handle checkout process
function checkout() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Check if the cart is empty
    if (cartItems.length === 0) {
        alert("Your cart is empty. Please add items before checking out.");
        return;
    }

    // Redirect to checkout page
    window.location.href = 'checkout.html';
}

// Load cart items when the page loads
window.onload = function() {
    loadCartItems();
};
