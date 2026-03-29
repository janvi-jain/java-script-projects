const getProducts = () => {
    return JSON.parse(localStorage.getItem("products")) || [];
};

const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

let currentProduct = null;

const viewProduct = () => {

    let id = localStorage.getItem("viewProductId");

    let products = getProducts();

    let product = products.find(p => p.id == id);

    if (!product) {
        alert("Product not found ❌");
        return;
    }

    currentProduct = product;

    document.getElementById("vName").innerText = product.prdName;
    document.getElementById("vPrice").innerText = "₹" + product.prdPrice;
    document.getElementById("vImage").src = product.prdUrl;
};

function viewcart() {
  let id = localStorage.getItem("viewProductId");
  cart = getCart();
  let products = getProducts();

  let product = products.find((prd) => {
    return prd.id == id;
  });

  let exists = cart.find((item) => {
    return item.id == id
  });

  if (exists) {
   exists.qty = (exists.qty || 1) + 1;
  } else {
    product.qty = 1;
    cart.push(product);
  }
  
  localStorage.setItem("cart", JSON.stringify(cart));
  badgeUpdate();

  alert("Added to cart ✅");
}

const badgeUpdate = () => {
  cart = getCart();
  let badge = document.getElementById("badge");
  badge.innerHTML = cart.length;

}

//cart

function updateQty() {
  let cart = getCart();
  let totalQty = 0;

  cart.forEach(item => {
    totalQty += item.qty;
  });

  let badge = document.getElementById("badge");

  if (totalQty > 0) {
    badge.innerText = totalQty;
    badge.style.display = "inline-block";
  } else {
    badge.style.display = "none"; // hide if empty
  }
}

function displayCart() {
  let cart = getCart();
  let cartData = document.getElementById("cartData");

  if (cart.length === 0) {
    cartData.innerHTML = `
      <div class="text-center py-4">
        <h5>🛒 Your cart is empty</h5>
        <p class="text-muted">Add some products to get started</p>
      </div>`;
    return;
  }

  let html = `
  <div class="table-responsive">
    <table class="table align-middle text-center">
      <thead class="table-dark">
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>`;

  let grandTotal = 0;

  cart.forEach(item => {
    let total = item.prdPrice * item.qty;
    grandTotal += total;

    html += `
      <tr>
        <td class="fw-semibold">${item.prdName}</td>
        <td>₹${item.prdPrice}</td>
        <td>
          <div class="d-flex justify-content-center align-items-center gap-2">
            <button class="btn btn-sm btn-outline-danger"
              onclick="decreaseQty(${item.id})"
              ${item.qty === 1 ? "disabled" : ""}>−</button>

            <span class="fw-bold">${item.qty}</span>

            <button class="btn btn-sm btn-outline-success"
              onclick="increaseQty(${item.id})">+</button>
          </div>
        </td>
        <td class="fw-bold text-success">₹${total}</td>
        <td>
          <button class="btn btn-sm btn-outline-dark"
            onclick="removeItem(${item.id})">❌</button>
        </td>
      </tr>`;
  });

  html += `
      </tbody>
    </table>
  </div>

  <div class="d-flex justify-content-between align-items-center mt-3">
    <button class="btn btn-outline-danger" onclick="clearCart()">
      🗑 Clear Cart
    </button>

    <h5 class="mb-0">Total: <span class="text-success">₹${grandTotal}</span></h5>
  </div>
  `;

  cartData.innerHTML = html;
}

function clearCart() {
  localStorage.removeItem("cart");
  updateQty();
  displayCart();
}

function increaseQty(id) {
  let cart = getCart();

  cart = cart.map(item => {
    if (item.id === id) {
      item.qty += 1;
    }
    return item;
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  updateQty()
  displayCart(); // refresh UI
}

function decreaseQty(id) {
  let cart = getCart();

  cart = cart.map(item => {
    if (item.id === id && item.qty > 1) {
      item.qty -= 1;
    }
    return item;
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  updateQty()
  displayCart();
}

function removeItem(id) {
  let cart = getCart();

  cart = cart.filter(item => item.id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));
  updateQty()
  displayCart();
}

showcart.addEventListener("click", () => {
  console.log("clicked"); 
  displayCart(); // 👈 IMPORTANT

  let myModal = new bootstrap.Modal(document.getElementById("cartModal"));
  myModal.show();
});

viewProduct();
badgeUpdate()
