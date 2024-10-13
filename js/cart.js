let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartItemsContainer = document.getElementById('cartItems');
let addressInput = document.getElementById('address-input');

function displayCartItems() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<li class="text-center text-gray-500 font-bold">Your cart is empty.</li>';
        updateTotal(0);
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = `
            <li class="block md:flex items-center justify-between border-b pb-4">
                <div class="flex items-center">
                    <img src="${item.image}" alt="${item.title} Cover" class="w-16 h-24 object-cover rounded">
                    <div class="ml-4">
                        <h3 class="text-md font-bold">${item.title}</h3>
                        <p class="text-gray-600">Author: ${item.author}</p>
                        <p class="text-gray-800 font-semibold">
                            $${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}
                        </p>
                    </div>
                </div>
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded block lg:flex"
                    onclick="removeFromCart('${item.title}')">
                    Remove
                </button>
            </li>
        `;
        cartItemsContainer.innerHTML += cartItem;
    });

    updateTotal(total); 
}

function updateTotal(total) {
    document.querySelector('.text-lg.font-bold').innerText = `$${total.toFixed(2)}`;
}

window.removeFromCart = (title) => {
    cart = cart.filter(item => item.title !== title);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
};

document.querySelector('button.bg-blue-500').addEventListener('click', () => {
    const address = addressInput.value.trim();
    if (address === '') {
        alert('Please enter your delivery address.');
        return;
    }

    if (cart.length === 0) {
        alert('Your cart is empty. Add items before proceeding to checkout.');
        return;
    }

    alert(`Thank you for your order! Your items will be delivered to:\n ${address}`);
    address.innerHTML = '';
    localStorage.removeItem('cart');
    cart = [];
    displayCartItems();
});

displayCartItems();
