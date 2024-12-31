const cart = [];
const availableItems = [
    { name: "Laptop", price: 15000000 },
    { name: "Smartphone", price: 8000000 },
    { name: "Headphone", price: 1000000 },
    { name: "Keyboard", price: 500000 },
    { name: "Mouse", price: 300000 }
];

const itemForm = document.getElementById('itemForm');
const cartItems = document.getElementById('cartItems');
const availableItemsTable = document.getElementById('availableItems');
const totalDisplay = document.getElementById('totalDisplay');
const discountDisplay = document.getElementById('discountDisplay');
const finalTotalDisplay = document.getElementById('finalTotalDisplay');

// Tampilkan daftar barang tersedia
function renderAvailableItems() {
    availableItems.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>Rp ${item.price.toLocaleString()}</td>
            <td><button onclick="addToCart(${index})">Pilih</button></td>
        `;
        availableItemsTable.appendChild(row);
    });
}

// Tambahkan barang dari daftar tersedia ke keranjang
function addToCart(index) {
    cart.push(availableItems[index]);
    renderCart();
}

// Tampilkan keranjang belanja
function renderCart() {
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>Rp ${item.price.toLocaleString()}</td>
            <td><button onclick="removeItem(${index})">Hapus</button></td>
        `;
        cartItems.appendChild(row);
    });
    updateTotals();
}

function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

// Hitung subtotal, diskon, dan total akhir
function updateTotals() {
    const subtotal = cart.reduce((total, item) => total + item.price, 0);
    let discount = 0;

    if (subtotal > 2000000) {
        discount = subtotal * 0.15;
    } else if (subtotal > 1000000) {
        discount = subtotal * 0.10;
    }

    if (cart.length > 5) {
        discount += subtotal * 0.05;
    }

    const finalTotal = subtotal - discount;

    totalDisplay.textContent = `Subtotal: Rp ${subtotal.toLocaleString()}`;
    discountDisplay.textContent = `Diskon: Rp ${discount.toLocaleString()}`;
    finalTotalDisplay.textContent = `Total Akhir: Rp ${finalTotal.toLocaleString()}`;
}

// Event listener untuk formulir input barang
itemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const itemName = document.getElementById('itemName').value;
    const itemPrice = parseInt(document.getElementById('itemPrice').value);

    cart.push({ name: itemName, price: itemPrice });
    renderCart();
    itemForm.reset();
});

// Inisialisasi tabel barang tersedia
renderAvailableItems();
