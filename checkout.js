let listCart = [];

function checkCart() {
    // Retrieve cart data from cookies
    var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));
    
    if (cookieValue) {
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }
}

checkCart();
addCartToHTML();

function addCartToHTML() {
    // Clear existing cart HTML
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;

    // Render the cart items if there are products in the cart
    if (listCart && listCart.length > 0) {
        listCart.forEach(product => {
            if (product) {
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = `
                    <img src="${product.image}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price}/1 product</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">$${(product.price * product.quantity).toFixed(2)}</div>`;
                
                listCartHTML.appendChild(newCart);

                // Update total quantity and price
                totalQuantity += product.quantity;
                totalPrice += product.price * product.quantity;
            }
        });
    }

    // Update total quantity and total price in the HTML
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = '$' + totalPrice.toFixed(2);

    // Optionally save the total price and quantity to localStorage for further use
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));
    localStorage.setItem('totalQuantity', totalQuantity);
}

// Form validation function
function validateForm(event) {
    // Get all input fields
    const form = document.getElementById('checkoutForm');
    let valid = true;

    // Loop through each input to check if it's valid
    form.querySelectorAll('input, select').forEach(input => {
        if (!input.checkValidity()) {
            valid = false;
            input.classList.add('error');
            input.nextElementSibling.style.display = 'block';
        } else {
            input.classList.remove('error');
            input.nextElementSibling.style.display = 'none';
        }
    });

    // If the form is not valid, prevent submission
    if (!valid) {
        event.preventDefault();
        alert('Please fill out all fields correctly.');
    }

    return valid;
}

// Hide error messages on input focus
document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('focus', function() {
        this.classList.remove('error');
        this.nextElementSibling.style.display = 'none';
    });
});

// Add event listener to checkout button
document.querySelector('.buttonCheckout').addEventListener('click', function() {
    alert("Order will be dispatched in 2 working days");
});

// Call the function to display the cart items and the total price/quantity
addCartToHTML();
