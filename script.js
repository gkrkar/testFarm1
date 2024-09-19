let users = [];
let currentUser = null;

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
    });
    document.querySelector(sectionId).classList.remove('hidden');

    // Close the menu after selecting a section on mobile
    if (window.innerWidth <= 768) {
        document.querySelector('nav').classList.remove('active');
    }
}

// Hamburger menu toggle
document.querySelector('.hamburger').addEventListener('click', function () {
    document.querySelector('nav').classList.toggle('active');
});

document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const userRole = document.getElementById('user-role').value;
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        alert('Username already exists, please choose another one.');
        return;
    }

    users.push({ username, password, role: userRole });
    alert(`Sign-up successful as a ${userRole}!`);

    showSection('#login');
});

document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        alert('Invalid username or password!');
        return;
    }

    currentUser = user;
    alert(`Welcome, ${user.username}!`);

    if (user.role === 'farmer') {
        showSection('#add-product');
    } else {
        showSection('#products');
    }
});

document.getElementById('product-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const productName = document.getElementById('product-name').value;
    const price = document.getElementById('price').value;

    const newProduct = document.createElement('div');
    newProduct.classList.add('product');
    newProduct.innerHTML = `
                <h3>${productName}</h3>
                <p>Price: ₹${price}/kg</p>
                <button class="buy-btn">Buy Now</button>
            `;

    const productList = document.querySelector('.product-list');
    productList.appendChild(newProduct);

    document.getElementById('product-form').reset();

    // Show the products section after adding a new product
    showSection('#products');

    alert('Product added successfully!');
});

// Initial section display
showSection('#home');