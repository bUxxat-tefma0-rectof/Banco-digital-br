const CART_KEY = "cart";

function addToCart(price) {
  const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  cart.push({ price, quantity: 1 });
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  alert("Adicionado ao carrinho");
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  const ul = document.getElementById("cart");
  if (!ul) return;

  ul.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.price;
    ul.appendChild(li);
  });
}

function checkout() {
  const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  fetch("http://localhost:4242/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: cart })
  })
    .then(res => res.json())
    .then(data => {
      Stripe("pk_live_SUA_CHAVE_PUBLICA")
        .redirectToCheckout({ sessionId: data.id });
    });
}

renderCart();
