const products = [
    { id: 1, name: 'Foam Roller', price: 2500, description: 'Comfortable yoga mat for workouts.', image: 'image/yoga-mat.png', category: 'equipment' },
    { id: 2, name: 'Dumbbells', price: 5000, description: 'Pair of adjustable dumbbells(20-50kg).', image: 'image/dumbbells.png', category: 'equipment' },
    { id: 3, name: 'KettleBells', price: 3500, description: 'Track your activities and health metrics(15-32kg).', image: 'image/kettlebells.png', category: 'equipment' },
    { id: 4, name: 'Jump Rope', price: 1500, description: 'Efficient cardio for fat-burning and endurance.', image: 'image/jumprope.png', category: 'equipment' },
    { id: 5, name: 'Ab-Wheel', price: 1500, description: 'Sculpt and strengthen your core with controlled rollouts.', image: 'image/abwheel.png', category: 'equipment' },
    { id: 6, name: 'Plant-Based Protein', price: 3500, description: 'Support muscle recovery with clean, plant-based protein.', image: 'image/1.png', category: 'supplements' },
    { id: 7, name: 'Creatine', price: 2500, description: 'Support muscle growth and performance enhancement.', image: 'image/2.png', category: 'supplements' },
    { id: 8, name: 'Casein Protein', price: 4000, description: 'Promote muscle repair with slow-digesting protein before bed.', image: 'image/3.png', category: 'supplements' },
    { id: 9, name: 'Creatine Monohydrate', price: 2500, description: 'Increase muscle strength and power during high-intensity workouts.', image: 'image/4.png', category: 'supplements' },
    { id: 10, name: 'Creatine HCL', price: 2500, description: 'Boost muscle performance with faster absorption and minimal bloating.', image: 'image/5.png', category: 'supplements' },
];

let currentCategory = 'all'; // Default category

function filterProducts(category) {
    currentCategory = category; // Set the current category
    displayProducts(); // Redisplay products based on the new category
}

// Update the displayProducts function to filter products based on category
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear the list before displaying

    const filteredProducts = currentCategory === 'all' 
        ? products 
        : products.filter(product => product.category === currentCategory);

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image"/>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: ${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="buyNow(${product.id})">Buy Now</button>
        `;

        productList.appendChild(productCard);
    });

    // Show the product list if there are products to display
    if (filteredProducts.length > 0) {
        productList.style.display = 'flex'; // Show product list
    } else {
        productList.style.display = 'none'; // Hide if no products found
    }
}

function buyNow(productId) {
    const product = products.find(p => p.id === productId);
    // Assuming you want to redirect to a checkout page with the product ID as a query parameter
    window.location.href = `checkout.html?productId=${productId}`;
}

// Function to add a product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    // Get the cart from localStorage or initialize it if not present
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1; // Increment the quantity
    } else {
        cart.push({ ...product, quantity: 1 }); // Add the product with a quantity of 1
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Show a confirmation message
    alert(`${product.name} has been added to your cart!`);
}

// Ensure the products are displayed when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initially hide the product list
    const productList = document.getElementById('product-list');
    productList.style.display = 'none'; // Hide product list by default
});
