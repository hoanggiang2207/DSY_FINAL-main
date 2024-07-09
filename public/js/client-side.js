// allProducts.js

// Assuming you have a container element to display the products
let productContainer = document.querySelector('.product-container');

const createProduct = (product) => {
    // Create HTML elements to display the product and append them to productContainer
    let productElement = document.createElement('div');
    productElement.classList.add('product-card'); // Add a class for styling

    // Adjust this based on your product structure
    productElement.innerHTML = `
        <img class="product-image" src="${product.image}" alt="${product.name}">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-des">${product.shortDes}</p>
        <p class="price">$${product.price}</p>
        <button class="cart-btn" data-product-id="${product.id}">Add to Cart</button>
    `;

    productContainer.appendChild(productElement);

    // Set up click event for the "Add to Cart" button
    let cartBtn = productElement.querySelector('.cart-btn');
    cartBtn.addEventListener('click', () => {
        cartBtn.innerHTML = add_product_to_cart(product);
    });
};

// Fetch all products
fetch('/get-all-products')
    .then(res => res.json())
    .then(data => {
        if (data === 'no products') {
            // Handle case where no products are available
            console.log('No products available.');
        } else {
            // Display each product
            data.forEach(product => createProduct(product));
        }
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });
