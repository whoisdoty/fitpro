document.getElementById("checkout-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page refresh

    // Gather user input
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const municipality = document.getElementById("municipality").value;
    const barangay = document.getElementById("barangay").value;

    // Check if all required fields are filled
    if (!name || !phone || !municipality || !barangay) {
        alert("Please fill out all the required fields.");
        return; // Exit the function if any field is empty
    }

    // Validate phone number
    const phoneRegex = /^(09[0-9]{9}|(\+63)[0-9]{10})$/; // Regex for valid PH mobile numbers
    if (!phoneRegex.test(phone)) {
        alert("Please enter a valid Philippine phone number (e.g., 09123456789 or +639123456789).");
        return; // Exit the function if phone number is invalid
    }

    // Payment and Delivery information
    const paymentMethod = "Cash on Delivery"; // Set payment method as COD
    const deliveryOptionButton = document.querySelector('.delivery-buttons .toggle-btn.active');
    const deliveryOption = deliveryOptionButton ? deliveryOptionButton.innerText : "Standard Delivery (3-5 days)";

    // Retrieve cart items from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before placing an order.");
        return; // Exit the function if the cart is empty
    }

    // Calculate total price
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Create the order object
    const order = {
        name,
        phone,
        address: `${barangay}, ${municipality}`,
        paymentMethod,
        deliveryOption,
        products: cart,
        totalPrice
    };

    // Log for debugging purposes
    console.log("Order object:", order);

    // Retrieve existing confirmed orders or initialize an empty array
    const confirmedOrders = JSON.parse(localStorage.getItem("confirmedOrders")) || [];
    confirmedOrders.push(order);

    // Save the updated confirmed orders back to localStorage
    localStorage.setItem("confirmedOrders", JSON.stringify(confirmedOrders));

    // Clear the cart from localStorage
    localStorage.removeItem('cart');

    // Display confirmation message
    alert(`
        Order Confirmation:

        Name: ${name}
        Address: ${barangay}, ${municipality}
        Phone: ${phone}
        Payment Method: ${paymentMethod}
        Delivery Option: ${deliveryOption}
        Total Price: ${totalPrice.toFixed(2)}

        Thank you for your order!
    `);

    // Redirect to confirmed orders page
    window.location.href = 'confirmed-orders.html'; // Adjust this path if necessary
});

function toggleDeliveryMethod(method, button) {
    const buttons = document.querySelectorAll('.delivery-buttons .toggle-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

function updateBarangays() {
    const barangaySelect = document.getElementById('barangay');
    const municipalitySelect = document.getElementById('municipality').value;

    // Clear previous barangay options
    barangaySelect.innerHTML = '<option value="">Select Barangay</option>';

    // Define barangays for Ipil
    const barangays = [
        "Bacalan", "Bangkerohan", "Buluan", "Caparan", "Domandan", "Don Andres",
        "Doña Josefa", "Guituan", "Ipil Heights", "Labe", "Logan", "Tirso Babiera (Lower Ipil Heights)",
        "Lower Taway", "Lumbia", "Maasin", "Magdaup", "Makilas", "Pangi", "Poblacion",
        "Sanito", "Suclema", "Taway", "Tenan", "Tiayon", "Timalang", "Tomitom",
        "Upper Pangi", "Veteran's Village"
    ];

    // Populate barangay dropdown for Ipil
    if (municipalitySelect === "Ipil") {
        barangays.forEach(barangay => {
            const option = document.createElement('option');
            option.value = barangay;
            option.textContent = barangay;
            barangaySelect.appendChild(option);
        });
    }
}
