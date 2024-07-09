// allProducts.js

// Assuming you have a container element to display the products
let productContainer = document.querySelector('.product-container');

const createProduct = (product) => {
    // Create HTML elements to display the product and append them to productContainer
    // Modify this according to your product structure
    let productElement = document.createElement('div');
    productElement.innerHTML = `<p>${product.name}</p>`; // Adjust this based on your product structure
    productContainer.appendChild(productElement);
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
