/* SweetCraft - Shared JavaScript */

const PRODUCTS = {
  'chocolate-truffle': {
    id: 'chocolate-truffle',
    name: 'Chocolate Truffle Cake',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
    price: 1199,
    weight: '1 kg',
    serves: 'Serves 8-10',
    rating: 4.8,
    reviews: 1200,
    badge: 'Bestseller'
  },
  'red-velvet': {
    id: 'red-velvet',
    name: 'Red Velvet Cake',
    image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d5ea?w=400&h=400&fit=crop',
    price: 1099,
    weight: '1 kg',
    serves: 'Serves 8-10',
    rating: 4.7,
    reviews: 980
  },
  'chocolate-pastry': {
    id: 'chocolate-pastry',
    name: 'Chocolate Pastry',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop',
    price: 299,
    weight: '1 Piece',
    serves: 'Serves 1',
    rating: 4.6,
    reviews: 450
  },
  'black-forest': {
    id: 'black-forest',
    name: 'Black Forest Cake',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=400&fit=crop',
    price: 899,
    weight: '1 kg',
    serves: 'Serves 8-10',
    rating: 4.7,
    reviews: 850,
    badge: 'Popular'
  },
  'butterscotch': {
    id: 'butterscotch',
    name: 'Butterscotch Cake',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop',
    price: 799,
    weight: '1 kg',
    serves: 'Serves 8-10',
    rating: 4.5,
    reviews: 620
  },
  'pineapple': {
    id: 'pineapple',
    name: 'Pineapple Cake',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=400&fit=crop',
    price: 699,
    weight: '1 kg',
    serves: 'Serves 8-10',
    rating: 4.4,
    reviews: 380,
    badge: 'New'
  },
  'kitkat': {
    id: 'kitkat',
    name: 'KitKat Chocolate Cake',
    image: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=400&h=400&fit=crop',
    price: 1299,
    weight: '1 kg',
    serves: 'Serves 8-10',
    rating: 4.9,
    reviews: 1100,
    badge: 'Bestseller'
  },
  'blueberry': {
    id: 'blueberry',
    name: 'Blueberry Cake',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5ba?w=400&h=400&fit=crop',
    price: 999,
    weight: '1 kg',
    serves: 'Serves 8-10',
    rating: 4.6,
    reviews: 540
  },
  'ferrero': {
    id: 'ferrero',
    name: 'Ferrero Rocher Cake',
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=400&fit=crop',
    price: 1499,
    weight: '1 kg',
    serves: 'Serves 8-10',
    rating: 4.8,
    reviews: 720,
    badge: 'Popular'
  },
  'rainbow': {
    id: 'rainbow',
    name: 'Rainbow Cake',
    image: 'https://images.unsplash.com/photo-1562448245-9dc49d82a172?w=400&h=400&fit=crop',
    price: 1199,
    weight: '1 kg',
    serves: 'Serves 8-10',
    rating: 4.7,
    reviews: 410,
    badge: 'New'
  }
};

const CART_KEY = 'sweetcraft_cart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartUI();
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function formatPrice(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

function addToCart(productId, qty = 1) {
  const product = PRODUCTS[productId];
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      weight: product.weight,
      serves: product.serves,
      qty
    });
  }

  saveCart(cart);
  showToast(`${product.name} added to cart!`);
}

function updateCartQty(productId, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  if (qty <= 0) {
    removeFromCart(productId);
    return;
  }

  item.qty = qty;
  saveCart(cart);
}

function removeFromCart(productId) {
  const cart = getCart().filter(i => i.id !== productId);
  saveCart(cart);
}

function clearCart() {
  saveCart([]);
  showToast('Cart cleared');
}

function updateCartUI() {
  const count = getCartCount();
  const total = getCartTotal();

  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });

  document.querySelectorAll('.cart-total').forEach(el => {
    el.textContent = formatPrice(total);
  });
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function initDefaultCart() {
  if (!localStorage.getItem(CART_KEY)) {
    const defaultCart = [
      { id: 'chocolate-truffle', name: 'Chocolate Truffle Cake', image: PRODUCTS['chocolate-truffle'].image, price: 1199, weight: '1 kg', serves: 'Serves 8-10', qty: 1 },
      { id: 'red-velvet', name: 'Red Velvet Cake', image: PRODUCTS['red-velvet'].image, price: 1099, weight: '1 kg', serves: 'Serves 8-10', qty: 1 },
      { id: 'chocolate-pastry', name: 'Chocolate Pastry', image: PRODUCTS['chocolate-pastry'].image, price: 299, weight: '1 Piece', serves: 'Serves 1', qty: 1 }
    ];
    localStorage.setItem(CART_KEY, JSON.stringify(defaultCart));
  }
}

function renderCartPage() {
  const cart = getCart();
  const tbody = document.getElementById('cart-items');
  const titleEl = document.getElementById('cart-title');
  if (!tbody) return;

  if (titleEl) titleEl.textContent = `Your Cart (${cart.length} Items)`;

  if (cart.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:40px;color:#999;">Your cart is empty. <a href="cakes.html" style="color:var(--pink);">Continue shopping</a></td></tr>`;
    updateSummary(0, 0);
    return;
  }

  tbody.innerHTML = cart.map(item => `
    <tr data-id="${item.id}">
      <td>
        <div class="cart-product">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-product-info">
            <h3>${item.name}</h3>
            <p>${item.weight} · ${item.serves}</p>
            <a href="product.html">✏️ Edit</a>
          </div>
        </div>
      </td>
      <td class="cart-price">${formatPrice(item.price)}</td>
      <td>
        <div class="qty-selector">
          <button class="qty-minus" data-id="${item.id}">−</button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-plus" data-id="${item.id}">+</button>
        </div>
      </td>
      <td class="cart-total-cell">${formatPrice(item.price * item.qty)}</td>
      <td><button class="remove-btn" data-id="${item.id}" title="Remove">🗑️</button></td>
    </tr>
  `).join('');

  const total = getCartTotal();
  updateSummary(cart.length, total);

  tbody.querySelectorAll('.qty-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const item = getCart().find(i => i.id === id);
      if (item) updateCartQty(id, item.qty - 1);
      renderCartPage();
    });
  });

  tbody.querySelectorAll('.qty-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const item = getCart().find(i => i.id === id);
      if (item) updateCartQty(id, item.qty + 1);
      renderCartPage();
    });
  });

  tbody.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(btn.dataset.id);
      renderCartPage();
      showToast('Item removed from cart');
    });
  });
}

function updateSummary(itemCount, total) {
  const subtotalEl = document.getElementById('summary-subtotal');
  const totalEl = document.getElementById('summary-total');
  const payBtn = document.getElementById('pay-btn');
  const payAmount = document.getElementById('pay-amount');

  if (subtotalEl) subtotalEl.textContent = formatPrice(total);
  if (totalEl) totalEl.textContent = formatPrice(total);

  const subLabel = document.getElementById('summary-subtotal-label');
  if (subLabel) subLabel.textContent = `Subtotal (${itemCount} Items)`;

  if (payAmount) payAmount.textContent = formatPrice(total);
}

function renderPaymentSummary() {
  const container = document.getElementById('payment-items');
  if (!container) return;

  const cart = getCart();
  container.innerHTML = cart.map(item => `
    <div class="summary-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="si-info">
        <h4>${item.name}</h4>
        <p>${item.weight}, Qty: ${item.qty}</p>
      </div>
      <div class="si-price">${formatPrice(item.price * item.qty)}</div>
    </div>
  `).join('');

  updateSummary(cart.length, getCartTotal());
}

function initAddToCartButtons() {
  document.querySelectorAll('[data-add-cart]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      addToCart(btn.dataset.addCart);
    });
  });
}

function initProductPage() {
  let selectedWeight = '1kg';
  let price = 1199;
  let qty = 1;

  const weights = {
    '500g': 699,
    '1kg': 1199,
    '1.5kg': 1599,
    '2kg': 1999
  };

  document.querySelectorAll('.weight-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.weight-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      selectedWeight = opt.dataset.weight;
      price = weights[selectedWeight];
    });
  });

  const qtyDisplay = document.getElementById('product-qty');
  document.getElementById('qty-minus')?.addEventListener('click', () => {
    if (qty > 1) { qty--; if (qtyDisplay) qtyDisplay.textContent = qty; }
  });
  document.getElementById('qty-plus')?.addEventListener('click', () => {
    qty++;
    if (qtyDisplay) qtyDisplay.textContent = qty;
  });

  document.getElementById('add-to-cart-btn')?.addEventListener('click', () => {
    addToCart('chocolate-truffle', qty);
  });

  document.getElementById('buy-now-btn')?.addEventListener('click', () => {
    addToCart('chocolate-truffle', qty);
    window.location.href = 'cart.html';
  });

  // Gallery
  const mainImg = document.getElementById('main-image');
  document.querySelectorAll('.gallery-thumbs img').forEach(thumb => {
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.gallery-thumbs img').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      if (mainImg) mainImg.src = thumb.src.replace('w=100', 'w=600').replace('h=100', 'h=600');
    });
  });

  document.getElementById('gallery-prev')?.addEventListener('click', () => {
    const thumbs = [...document.querySelectorAll('.gallery-thumbs img')];
    const active = thumbs.findIndex(t => t.classList.contains('active'));
    const next = (active - 1 + thumbs.length) % thumbs.length;
    thumbs[next].click();
  });

  document.getElementById('gallery-next')?.addEventListener('click', () => {
    const thumbs = [...document.querySelectorAll('.gallery-thumbs img')];
    const active = thumbs.findIndex(t => t.classList.contains('active'));
    const next = (active + 1) % thumbs.length;
    thumbs[next].click();
  });

  // Tabs
  document.querySelectorAll('.tab-nav button').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab-nav button').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab)?.classList.add('active');
    });
  });
}

function initPaymentPage() {
  document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', () => {
      document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
      method.classList.add('active');
      method.querySelector('input').checked = true;

      const type = method.dataset.method;
      const details = document.getElementById('payment-details-content');
      if (!details) return;

      if (type === 'upi') {
        details.innerHTML = `
          <h3>Pay using UPI</h3>
          <p>Scan the QR code using any UPI app</p>
          <div class="qr-code"><img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=sweetcraft@upi" alt="UPI QR Code"></div>
          <div class="upi-logos"><span>UPI</span><span>GPay</span><span>PhonePe</span><span>Paytm</span></div>
          <p style="font-size:12px;margin-bottom:8px;">Or pay using UPI ID</p>
          <div class="upi-id-row">
            <input type="text" value="sweetcraft@upi" readonly id="upi-id">
            <button id="copy-upi">Copy</button>
          </div>
          <div class="secure-banner">🛡️ 100% Secure Payments</div>
        `;
        document.getElementById('copy-upi')?.addEventListener('click', () => {
          navigator.clipboard.writeText('sweetcraft@upi');
          showToast('UPI ID copied!');
        });
      } else if (type === 'card') {
        details.innerHTML = `
          <h3>Credit / Debit Card</h3>
          <p>Enter your card details securely</p>
          <div style="max-width:360px;margin:20px auto;text-align:left;">
            <input type="text" placeholder="Card Number" style="width:100%;padding:12px;border:1px solid #e0e0e0;border-radius:8px;margin-bottom:12px;font-size:13px;">
            <div style="display:flex;gap:12px;">
              <input type="text" placeholder="MM/YY" style="flex:1;padding:12px;border:1px solid #e0e0e0;border-radius:8px;font-size:13px;">
              <input type="text" placeholder="CVV" style="flex:1;padding:12px;border:1px solid #e0e0e0;border-radius:8px;font-size:13px;">
            </div>
          </div>
          <div class="secure-banner">🛡️ 100% Secure Payments</div>
        `;
      } else if (type === 'cod') {
        details.innerHTML = `
          <h3>Cash on Delivery</h3>
          <p>Pay when your order is delivered to your doorstep</p>
          <div style="padding:20px;background:#f5f5f5;border-radius:8px;max-width:360px;margin:20px auto;font-size:13px;color:#666;">
            Please keep exact change ready. COD is available for orders below ₹5,000.
          </div>
          <div class="secure-banner">🛡️ 100% Secure Payments</div>
        `;
      } else {
        details.innerHTML = `
          <h3>${method.textContent.trim()}</h3>
          <p>Select your preferred option to proceed with payment</p>
          <div style="padding:30px;color:#999;font-size:13px;">Payment gateway integration coming soon.</div>
          <div class="secure-banner">🛡️ 100% Secure Payments</div>
        `;
      }
    });
  });

  document.getElementById('pay-btn')?.addEventListener('click', () => {
    showToast('🎉 Order placed successfully! Thank you for shopping with SweetCraft.');
    setTimeout(() => {
      clearCart();
      window.location.href = 'index.html';
    }, 2000);
  });
}

function initCarousel() {
  document.querySelectorAll('.carousel-wrap').forEach(wrap => {
    const track = wrap.querySelector('.carousel-track');
    const prev = wrap.querySelector('.carousel-btn.prev');
    const next = wrap.querySelector('.carousel-btn.next');
    if (!track) return;

    prev?.addEventListener('click', () => track.scrollBy({ left: -220, behavior: 'smooth' }));
    next?.addEventListener('click', () => track.scrollBy({ left: 220, behavior: 'smooth' }));
  });
}

function initHeroSlider() {
  const images = [
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=500&fit=crop',
    'https://images.unsplash.com/photo-1562448245-9dc49d82a172?w=600&h=500&fit=crop',
    'https://images.unsplash.com/photo-1586788680434-30d324b2d5ea?w=600&h=500&fit=crop'
  ];
  let current = 0;
  const heroImg = document.getElementById('hero-image');
  const dots = document.querySelectorAll('.hero-dot');

  if (!heroImg) return;

  setInterval(() => {
    current = (current + 1) % images.length;
    heroImg.style.opacity = '0';
    setTimeout(() => {
      heroImg.src = images[current];
      heroImg.style.opacity = '1';
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }, 300);
  }, 4000);

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      current = i;
      heroImg.src = images[current];
      dots.forEach((d, j) => d.classList.toggle('active', j === current));
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initDefaultCart();
  updateCartUI();
  initAddToCartButtons();
  initCarousel();
  initHeroSlider();

  if (document.getElementById('cart-items')) renderCartPage();
  if (document.getElementById('payment-items')) renderPaymentSummary();
  if (document.querySelector('.product-detail')) initProductPage();
  if (document.querySelector('.payment-box')) initPaymentPage();

  document.getElementById('clear-cart-btn')?.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      renderCartPage();
    }
  });

  document.getElementById('checkout-btn')?.addEventListener('click', () => {
    if (getCart().length === 0) {
      showToast('Your cart is empty!');
      return;
    }
    window.location.href = 'payment.html';
  });

  document.getElementById('newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Thank you for subscribing!');
    e.target.reset();
  });
});
