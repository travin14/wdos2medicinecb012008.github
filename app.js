let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Ibuprofen',
        image: '1.PNG',
        price: 200,
        category: 'Analgesics'
    },
    {
        id: 2,
        name: 'Aspirin',
        image: '2.PNG',
        price: 150,
        category: 'Analgesics'
    },
    {
        id: 3,
        name: 'Morphine',
        image: '3.PNG',
        price: 220,
        category: 'Analgesics'
    },
    {
        id: 4,
        name: 'Penicillin',
        image: '4.PNG',
        price: 123,
        category: 'Antibiotics'
    },
    {
        id: 5,
        name: 'Amoxicillin',
        image: '5.PNG',
        price: 320,
        category: 'Antibiotics'
    },
    {
        id: 6,
        name: 'Clindamycin',
        image: '6.PNG',
        price: 120,
        category: 'Antibiotics'
    },
    {
        id: 7,
        name: 'Citalopram',
        image: '7.PNG',
        price: 230,
        category: 'Antidepressants'
    },
    {
        id: 8,
        name: 'Escitalopram',
        image: '8.PNG',
        price: 250,
        category: 'Antidepressants'
    },
    {
        id: 9,
        name: 'Fluoxetine',
        image: '9.PNG',
        price: 210,
        category: 'Antidepressants'
    },
    {
        id: 10,
        name: 'Cyclizine',
        image: '10.PNG',
        price: 180,
        category: 'Antihistamines'
    },
    {
        id: 11,
        name: 'Cetirizine',
        image: '11.PNG',
        price: 190,
        category: 'Antihistamines'
    },
    {
        id: 12,
        name: 'Paracetamol',
        image: '12.PNG',
        price: 110,
        category: 'Analgesics'
    }
];

let listCards = [];
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <div class="category">${value.category}</div>
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>
            <button onclick="addToFavorite(${key})">Add To Favorite</button>`;
        list.appendChild(newDiv);
    });
}
initApp();

function addToCard(key) {
    if (listCards[key] == null) {
        // copy product from list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}

// Function to update the cart and store total price and quantity
function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice += value.price * value.quantity;
        count += value.quantity;
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div class="category">${value.category}</div>
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;

    // Store total price and quantity in localStorage
    localStorage.setItem('totalPrice', totalPrice);
    localStorage.setItem('totalQuantity', count);
}

// Add event listener for the "Proceed to Checkout" button
document.querySelector('.checkoutLink a').addEventListener('click', function() {
    // Ensure total price and quantity are stored when navigating to checkout page
    localStorage.setItem('totalPrice', total.innerText);
    localStorage.setItem('totalQuantity', quantity.innerText);
});


function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

let favoriteItems = [];

function addToFavorite(key) {
    if (!favoriteItems.includes(products[key])) {
        favoriteItems.push(products[key]);
        alert(`${products[key].name} added to favorites!`);
        updateFavoriteUI();
    } else {
        alert(`${products[key].name} is already in favorites!`);
    }
}

function updateFavoriteUI() {
    // Function to update the UI with favorite items (if needed)
}
