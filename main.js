function displayProducts(productList) {
  const container = document.getElementById('product-list');
  container.innerHTML = '';
  productList.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img class="product-img" src="${product.image_url}" alt="${product.name}" />
      <div class="product-info">
        <div>
          <div class="product-title">${product.name}</div>
          <div class="product-price">Rp${product.price.toLocaleString('id-ID')}</div>
        </div>
        <button class="product-btn" onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image_url}')">Beli</button>
      </div>
    `;
    container.appendChild(card);
  });
}

async function loadProducts() {
  const products = await fetchProducts();
  displayProducts(products);

  // Search functionality
  const searchInput = document.getElementById('search');
  searchInput.addEventListener('input', function() {
    const keyword = this.value.toLowerCase();
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(keyword)
    );
    displayProducts(filtered);
  });
}

// Simple cart (localStorage)
function addToCart(id, name, price, image_url) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const found = cart.find(item => item.id === id);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ id, name, price, image_url, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Produk dimasukkan ke keranjang!');
}

document.addEventListener('DOMContentLoaded', loadProducts);
