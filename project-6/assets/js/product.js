const getProducts = () => {
  return JSON.parse(localStorage.getItem("products")) || [];
};

const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

let products = getProducts()
let cart = getCart()
let searchBox = document.getElementById("searchBox");
let sortAsc = document.getElementById("sortAsc");
let sortDesc = document.getElementById("sortDesc");
let sortName = document.getElementById("sortName");
let showcart = document.getElementById("showcart");

const displayproduct = (data) => {

  let productList = document.getElementById("productList");
  if (!productList) return;

  let products = data || getProducts();;
  let html = "";

  products.forEach((prd) => {
    html += `
            <div class="col-md-4 col-lg-3 mb-4">
              <div class="product-card">

                <div class="product-img">
                  <img src="${prd.prdUrl}" alt="">
                  <span class="badge-new">NEW</span>
                  <i class="bi bi-heart heart-icon"></i>
                </div>

                <div class="product-body">
                  <small class="text">IN STOCK · FREE DELIVERY</small>

                  <h6 class="product-title">${prd.prdName}</h6>

                  <div class="d-flex justify-content-between align-items-center mt-2">
                    <span class="price">₹${prd.prdPrice}</span>
                    <span class="rating"><i class="bi bi-star-fill"></i> 4.5</span>
                  </div>

                  <div class="d-flex gap-2 mt-3">
                    <button class="btn btn-outline-light w-50" onclick="viewProduct(${prd.id})">VIEW</button>
                    <button class="btn btn-gradient w-50" onclick="addToCart(${prd.id})">CART</button>
                  </div>
                </div>

              </div>
            </div>`;
  });

  productList.innerHTML = html;
};

searchBox.addEventListener("input", () => {

  let searchValue = searchBox.value.toLowerCase();

  let products = getProducts();

  let filtered = products.filter((prd) =>
    prd.prdName.toLowerCase().includes(searchValue)
  );

  displayproduct(filtered);
});

sortAsc.addEventListener("click", () => {
  let sortasc = products.sort((a, b) => {
    return a.prdPrice - b.prdPrice
  })

  displayproduct(sortasc)
})

sortDesc.addEventListener("click", () => {
  let sortdesc = products.sort((a, b) => {
    return b.prdPrice - a.prdPrice
  })

  displayproduct(sortdesc)
})

sortName.addEventListener("click", () => {
  let sortname = products.sort((a, b) => {
    return a.prdName.trim().toLowerCase().localeCompare(b.prdName.trim().toLowerCase());
  });

  displayproduct(sortname)
})


//cart

function updateQty() {
  cart = getCart();
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
  displayCart(); 
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
  displayCart();

  let myModal = new bootstrap.Modal(document.getElementById("cartModal"));
  myModal.show();
});


const viewProduct = (id) => {
  localStorage.setItem("viewProductId", id);
  window.location = "view.html";
};

const viewcart = (id) => {
  id = localStorage.getItem("viewProductId");
  window.location = "view.html";
};

function addToCart(id) {

  cart = getCart();
  let products = getProducts();

  let product = products.find((prd) => {
    return prd.id == id;
  });

  let exists = cart.find((item) => {
    return item.id == id
  });

  if (exists) {
    exists.qty = exists.qty + 1;
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



displayproduct(products);
badgeUpdate();