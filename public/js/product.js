let ratingStarInput = [...document.querySelectorAll('.rating-star')];
let rate = 0;

ratingStarInput.map((star, index) => {
    star.addEventListener('click', () => {
        rate = `${index + 1}.0`;
        for(let i = 0; i < 5; i++){
            if(i <= index){
                ratingStarInput[i].src = `../img/fill star.png`;
            } else{
                ratingStarInput[i].src = `../img/no fill star.png`;
            }
        }
    })
})

// product page setting

let productName = document.querySelector('.product-title');
let shortDes = document.querySelector('.product-des');
let price = document.querySelector('.price');
let detail = document.querySelector('.des');
let productImage = document.querySelector('.product-image');
let title = document.querySelector('title');

let cartBtn = document.querySelector('.cart-btn');

const setData = (data) => {
    productName.innerHTML = title.innerHTML = data.name;
    productImage.src = data.image;
    shortDes.innerHTML = data.shortDes;
    detail.innerHTML = data.detail;
    price.innerHTML = `$${data.price}`;

    cartBtn.addEventListener('click', () => {
        cartBtn.innerHTML = add_product_to_cart(data);
    })
}

const fetchProductData = () => {
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({id: productId})
    }).then(res => res.json())
    .then(data => {
        setData(data)
        getProducts(data.tags[0]).then(res => createProductCards(res, 'similar rooms', '.best-selling-product-section'))
    })
    .catch(err => {
        console.log(err)
        alert('no product found');
        location.replace('/404');
    })
}

productId = null;
if(location.pathname != '/add-product'){
    productId = decodeURI(location.pathname.split('/').pop());
    fetchProductData();
}