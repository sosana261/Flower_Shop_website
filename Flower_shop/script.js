/************** CART STORAGE **************/
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/************** SHOP PAGE **************/
function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart 🛒`);
}

/************** CART PAGE **************/
function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const totalPrice = document.getElementById("totalPrice");

  if (!cartItems) return; // not on cart page

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    totalPrice.textContent = "";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name}</span>
      <span>$${item.price}</span>
      <span>Qty: ${item.quantity}</span>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartItems.appendChild(div);
  });

  totalPrice.textContent = `Total: $${total}`;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function clearCart() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

/************** CHECKOUT **************/
document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  const checkoutBtn = document.getElementById("checkoutBtn");
  const cancelBtn = document.getElementById("cancelOrderBtn");
  const checkoutForm = document.getElementById("checkoutForm");

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty ❌");
        return;
      }
      checkoutForm.classList.toggle("hidden");
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      clearCart();
      checkoutForm.classList.add("hidden");
      alert("Order cancelled ❌");
    });
  }

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", e => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const address = document.getElementById("address").value;

      alert(
        `Order confirmed 🎉\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address || "N/A"}`
      );

      clearCart();
      checkoutForm.reset();
      checkoutForm.classList.add("hidden");
    });
  }
});
