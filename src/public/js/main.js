
const socket = io();


const productList = document.getElementById('productList');
const productForm = document.getElementById('productForm');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const imageUrlInput = document.getElementById('imageUrl');


socket.on('updateProducts', (products) => {
    productList.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('li');
        productElement.id = `product-${product.id}`;
        productElement.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}" style="width: 100px; height: auto;">
            <div>
                <strong>${product.name}</strong> - $${product.price}
            </div>
            <button onclick="deleteProduct(${product.id})">Eliminar</button>
        `;
        productList.appendChild(productElement);
    });
});


productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newProduct = {
        id: Date.now(),
        name: nameInput.value,
        price: parseFloat(priceInput.value),
        imageUrl: imageUrlInput.value
    };
    socket.emit('newProduct', newProduct);
    nameInput.value = '';
    priceInput.value = '';
    imageUrlInput.value = '';
});


function deleteProduct(productId) {
    socket.emit('deleteProduct', productId);
}
