const bouquets = [
  { id: 1, name: "Rose Elegance", description: "Classic red roses.", price: 1299, image: "https://via.placeholder.com/400x200?text=Roses" },
  { id: 2, name: "Spring Delight", description: "Tulips and daisies.", price: 1499, image: "https://via.placeholder.com/400x200?text=Tulips" },
  { id: 3, name: "Pastel Harmony", description: "Peonies and hydrangeas.", price: 1999, image: "https://via.placeholder.com/400x200?text=Pastel" }
];

function renderBouquets() {
  const grid = document.getElementById("bouquet-grid");
  grid.innerHTML = bouquets.map(b => `
    <div class="card">
      <img src="${b.image}" alt="${b.name}">
      <div class="card-content">
        <h3>${b.name}</h3>
        <p>${b.description}</p>
        <div class="price">₹${b.price}</div>
        <button class="primary" onclick="addToCart(${b.id})">Add to Cart</button>
      </div>
    </div>
  `).join("");
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}
function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function addToCart(id) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) item.qty += 1; else cart.push({ id, qty: 1 });
  setCart(cart);
  renderCart();
}
function removeItem(id) {
  let cart = getCart().filter(i => i.id !== id);
  setCart(cart);
  renderCart();
}
function renderCart() {
  const cart = getCart();
  const itemsEl = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  let total = 0;
  itemsEl.innerHTML = cart.map(ci => {
    const b = bouquets.find(x => x.id === ci.id);
    total += b.price * ci.qty;
    return `<div style="display:flex;justify-content:space-between;margin-bottom:6px;">
      <span>${b.name} x ${ci.qty}</span>
      <span>₹${b.price * ci.qty}</span>
      <button onclick="removeItem(${ci.id})">X</button>
    </div>`;
  }).join("");
  totalEl.textContent = `₹${total}`;
}
document.getElementById("checkout-btn").addEventListener("click", () => {
  alert("Demo checkout: Thank you for your order!");
  setCart([]);
  renderCart();
});

renderBouquets();
renderCart();