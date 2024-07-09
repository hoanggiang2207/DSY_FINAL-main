window.onload = () => {
    if (!sessionStorage.user) {
        location.replace('/login')
    }

    if (location.search.includes('payment=done')) {
        let items = [];
        localStorage.setItem('cart', JSON.stringify(items));
        showFormError("order is placed");
    }
    if (location.search.includes('paymant_fail=true')) {
        showFormError("some error occured. Please try again");
    }
}

// select place order button
const placeOrderBtn = document.querySelector('.place-order-btn');

placeOrderBtn.addEventListener('click', () => {
    let data = validateData();

    if (data) {
        // send data to backend
        fetch('/stipe-checkout', {
            method: 'post',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                items: JSON.parse(localStorage.getItem('cart')),
                data: data,
                email: JSON.parse(sessionStorage.user).email
            })
        })
            .then(res => res.json())
            .then(url => {
                location.href = url;
            })
            .catch(err => console.log(err))
    }
})


const validateData = () => {
    // form validation
    let name = document.getElementById('name').value;
    let phoneNumber = document.getElementById('phone_number').value;
    let peopleNumber = document.getElementById('people_number').value;
    let checkin = document.getElementById('checkin').value;
    let checkout = document.getElementById('checkout').value;

    if (!name || !phoneNumber || !peopleNumber || !checkin || !checkout) {
        return showFormError("Fill all the inputs");
    } else {
        return { name, phoneNumber, peopleNumber, checkin, checkout }
    }
}