let stateLibrary = [
  {image: 'img/harry.png', title: "Harry Potter and the Philosopher's Stone", author: "J.K Rowling", Availability: true, price: 9.99},
  {image: 'img/rings.png', title: "The Lord of the Rings", author: "J.R.R. Tolkien", Availability: true, price: 14.99},
  {image: 'img/hunger.png', title: "The Hunger Games", author: "Suzanne Collins", Availability: true, price: 12.99},
  {image: 'img/catcher.png', title: "The Catcher in the Rye", author: "J.D. Salinger", Availability: true, price: 10.99},
  {image: 'img/mockingbird.png', title: "To Kill a Mockingbird", author: "Harper Lee", Availability: true, price: 8.99},
  {image: 'img/1984.png', title: "1984", author: "George Orwell", Availability: true, price: 11.99},
  {image: 'img/gatsby.png', title: "The Great Gatsby", author: "F. Scott Fitzgerald", Availability: true, price: 7.99},
  {image: 'img/pride.png', title: "Pride and Prejudice", author: "Jane Austen", Availability: true, price: 6.99},
  {image: 'img/dorian.png', title: "The Picture of Dorian Gray", author: "Oscar Wilde", Availability: false, price: 10.99},
  {image: 'img/wuthering.png', title: "Wuthering Heights", author: "Emily Brontë", Availability: false, price: 12.99},
  {image: 'img/count.png', title: "The Count of Monte Cristo", author: "Alexandre Dumas", Availability: true, price: 15.99},
  {image: 'img/othello.png', title: "Othello", author: "William Shakespeare", Availability: false, price: 9.99},
  {image: 'img/things.png', title: "Things Fall Apart", author: "Chinua Achebe", Availability: true, price: 10.99},
  {image: 'img/why.png', title: "Why You Act The Way You Do", author: "Tim Clinton", Availability: true, price: 14.99},
  {image: 'img/shadow.png', title: "Shadow Slave", author: "GuiltyThree", Availability: true, price: 11.99},
  {image: 'img/power.png', title: "Power", author: "Jeffrey Pfeffer", Availability: true, price: 19.99},
  {image: 'img/vampire.png', title: "My Vampire System", author: "JksManga", Availability: true, price: 8.99},
  {image: 'img/alchemist.png', title: "The Alchemist", author: "Paulo Coelho", Availability: true, price: 13.99},
  {image: 'img/night.png', title: "The Night Circus", author: "Erin Morgenstern", Availability: true, price: 16.99},
  {image: 'img/silent.png', title: "The Silent Patient", author: "Alex Michaelides", Availability: true, price: 19.99}
];

let searchBooks = document.getElementById('search');
let searchResults = document.querySelector('#search-results');
let searchButton = document.querySelector('#search-button');
let localCart = localStorage.getItem('cart');
let cart = localCart ? JSON.parse(localCart) : [];

searchButton.addEventListener('click', () => {
  let searchValue = searchBooks.value.trim().toLowerCase();
  if (searchValue === '') {
    alert('Please enter a search query');
  } else {
    let queryResult = stateLibrary.filter(book => book.title.toLowerCase().includes(searchValue));
    displaySearchResults(queryResult);
  }
});

function displaySearchResults(queryResult) {
  let welcome = document.querySelector('.welcome');
  let bookItems = document.querySelectorAll('.menu-item');

  if (queryResult.length > 0) {
    bookItems.forEach(bookItem => {
      let bookTitle = bookItem.querySelector('h3').textContent.toLowerCase();
      bookItem.style.display = queryResult.some(book => book.title.toLowerCase() === bookTitle) ? 'block' : 'none';
    });
    welcome.style.display = 'none';
  } else {
    bookItems.forEach(bookItem => bookItem.style.display = 'none');
    searchResults.style.color = 'red';
    searchResults.style.display = 'flex';
    searchResults.style.justifyContent = 'center';
    searchResults.style.alignItems = 'center';
    searchResults.style.fontSize = '25px';
    searchResults.innerHTML = 'No books found matching your search query.';
  }
}

function displayBooks(library) {
  let bookContainer = document.querySelector('#bookContainer');
  bookContainer.innerHTML = '';

  library.forEach(book => {
    let bookCard = `
      <div class="max-w-sm rounded-lg overflow-hidden shadow-xl bg-white transition-transform duration-300 hover:shadow-2xl menu-item">
          <img class="object-cover w-full h-48" src="${book.image}" alt="${book.title} Book Cover">
          <div class="p-4">
              <h3 class="text-xl font-bold mb-2">${book.title}</h3>
              <p class="text-gray-900 mb-4">Author: ${book.author}</p>
              <p class="text-gray-600 text-sm mb-4">Price: $${book.price.toFixed(2)}</p>
              <p class="text-gray-600 text-sm mb-8">${book.Availability ? 'Available' : 'Not Available'}</p>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 btn-add" ${!book.Availability ? 'disabled' : ''}>
                  Add to Cart
              </button>
          </div>
      </div>`;
    bookContainer.innerHTML += bookCard;
  });
  
  document.querySelectorAll('.btn-add').forEach((button) => {
    button.addEventListener('click', (e) => {
      let bookTitle = e.target.parentNode.querySelector('h3').textContent;
      let book = stateLibrary.find((item) => item.title === bookTitle);
      addToCart(book);
    });
  });
}

let homePageButtons = document.querySelectorAll('.btn-add');

homePageButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    let bookTitle = e.target.parentNode.querySelector('h3').textContent;
    let book = stateLibrary.find((item) => item.title === bookTitle);
    addToCart(book);
  });
});

function filterAvailableBooks(library) {
  return library.filter(book => book.Availability);
}

document.addEventListener('DOMContentLoaded', () => {
  let availableBooks = filterAvailableBooks(stateLibrary);
  displayBooks(availableBooks);
});

function addToCart(book) {
  if (!book.Availability) {
    alert(`${book.title} is unavailable, cannot be added to your cart.`);
    return;
  }

  let existingBook = cart.find((item) => item.title === book.title);
  if (existingBook) {
    existingBook.quantity++;
    alert(`${book.title}'s quantity has been increased in your cart`);
  } else {
    cart.push({ ...book, quantity: 1 });
    alert(`${book.title} has been added to your cart`);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

