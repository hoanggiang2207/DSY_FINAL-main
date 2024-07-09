// allProducts.js

let ratingStarInput = [...document.querySelectorAll('.rating-star')];
let rate = 0;

ratingStarInput.map((star, index) => {
    star.addEventListener('click', () => {
        rate = `${index + 1}.0`;
        for (let i = 0; i < 5; i++) {
            if (i <= index) {
                ratingStarInput[i].src = `../img/fill star.png`;
            } else {
                ratingStarInput[i].src = `../img/no fill star.png`;
            }
        }
    });
});

// Function to create product card
const createProductCard = (product) => {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-des">${product.shortDes}</p>
                <p class="price">$${product.price}</p>
                <button class="cart-btn">Add to Cart</button>
            </div>
        </div>
    `;
};

const productContainer = document.querySelector('.product-container');

const setData = (data) => {
    productContainer.innerHTML += createProductCard(data);
};

const fetchProductData = () => {
    fetch('/products', {
        method: 'get',
        headers: new Headers({'Content-Type': 'application/json'})
    })
    .then(res => {
        if (res.redirected) {
           
            return;
        }
        return res.json();
    })
    .then(data => {
        if (Array.isArray(data) && data.length > 0) {
            data.forEach(product => {
                setData(product);
            });
        } else {
            alert('No products found');
        }
    })
    .catch(err => {
        console.log(err);
        alert('No products found');
        location.replace('/404');
    });
}

fetchProductData();
