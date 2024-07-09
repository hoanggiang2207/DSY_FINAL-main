let user = JSON.parse(sessionStorage.user || null)

if (user == null) {
    location.replace('/login');
}

let greeting = document.querySelector('#greeting');
greeting.innerHTML += user.name;

// loader
let loader = document.querySelector('.loader');
let noProductImg = document.querySelector('.no-product');

loader.style.display = 'block';

const setupProducts = () => {
    fetch('/get-products') // Assuming you have an endpoint to fetch all products
        .then(res => res.json())
        .then(data => {
            loader.style.display = 'none';
            if (data.length === 0) {
                noProductImg.style.display = 'block';
            } else {
                data.forEach(product => createProduct(product));
            }
        })
}

setupProducts();
