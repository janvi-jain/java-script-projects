function generateStars(rating) {
  let stars = "";

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars += `<li class="text-warning"><i class="ri-star-fill"></i></li>`;
    } 
    else if (rating >= i - 0.5) {
      stars += `<li class="text-warning"><i class="ri-star-half-fill"></i></li>`;
    } 
    else {
      stars += `<li class="text-warning"><i class="ri-star-line"></i></li>`;
    }
  }

  return stars;
}

let products = [
  {
    id: 1,
    name: "Blue Dress For Woman",
    category: "Women",
    price: 45.00,
    oldPrice: 55.25,
    discountPercent: 35,
    rating: 4,
    reviews: 21,
    colours: [
      {
        code: "#87554b",
        color: "brown"
      },
      {
        code: "#333333",
        color: "black"
      },
      {
        code: "#da323f",
        color: "red"
      }
    ],
    badge: null,
    image: "./assets/images/product_img1.jpg"
  },
  {
    id: 2,
    name: "Lether Gray Tuxedo",
    category: "Men",
    price: 55.00,
    oldPrice: 95.00,
    discountPercent: 25,
    rating: 3.5,
    reviews: 15,
    colours: [
      {
        code: "#847764",
        color: "skin"
      },
      {
        code: "#0393b5",
        color: "blue"
      },
      {
        code: "#da323f",
        color: "red"
      }
    ],
    badge: null,
    image: "./assets/images/product_img2.jpg"
  },
  {
    id: 3,
    name: "Woman Full Sliv Dress",
    category: "Women",
    price: 68.00,
    oldPrice: 99.00,
    discountPercent: 15,
    rating: 4.5,
    reviews: 25,
    colours: [
      {
        code: "#333333",
        color: "black"
      },
      {
        code: "#7c502f",
        color: "brown"
      },
      {
        code: "#2f366c",
        color: "blue"
      },
      {
        code: "#874a3d",
        color: "maroon"
      },
    ],
    badge: "NEW",
    image: "./assets/images/product_img3.jpg"
  },
  {
    id: 4,
    name: "Light Blue Shirt",
    category: "Kids",
    price: 69.00,
    oldPrice: 89.00,
    discountPercent: 20,
    rating: 3.5,
    reviews: 22,
    colours: [
      {
        code: "#333333",
        color: "black"
      },
      {
        code: "#a92534",
        color: "pink"
      },
      {
        code: "#b9c2df",
        color: "ice-blue"
      }

    ],
    badge: null,
    image: "./assets/images/product_img4.jpg"
  },
  {
    id: 5,
    name: "Blue Dress For Woman",
    category: "Women",
    price: 45.00,
    oldPrice: 55.25,
    discountPercent: 35,
    rating: 4,
    reviews: 21,
    colours: [
      {
        code: "#87554b",
        color: "brown"
      },
      {
        code: "#333333",
        color: "black"
      },
      {
        code: "#5fb7d4",
        color: "sky-blue"
      },

    ],
    badge: null,
    image: "./assets/images/product_img5.jpg"
  },
  {
    id: 6,
    name: "Blue Casual Check Shirt",
    category: "Men",
    price: 55.00,
    oldPrice: 95.00,
    discountPercent: 25,
    rating: 3.5,
    reviews: 15,
    colours: [
      {
        code: "#333333",
        color: "black"
      },
      {
        code: "#87554b",
        color: "brown"
      }
    ],
    badge: "HOT",
    image: "./assets/images/product_img6.jpg"
  },
  {
    id: 7,
    name: "White Black Line Dress",
    category: "Women",
    price: 68.00,
    oldPrice: 99.00,
    discountPercent: 20,
    rating: 4.5,
    reviews: 25,
    colours: [
      {
        code: "#333333",
        color: "black"
      },
      {
        code: "#7c502f",
        color: "brown"
      },
      {
        code: "#2f366c",
        color: "blue"
      }
    ],
    badge: "SALE",
    image: "./assets/images/product_img7.jpg"
  },
  {
    id: 8,
    name: "Men Blue Jins Shirt",
    category: "Men",
    price: 69.00,
    oldPrice: 89.00,
    discountPercent: 20,
    rating: 3.5,
    reviews: 22,
    colours: [
      {
        code: "#333333",
        color: "black"
      },
      {
        code: "#444653",
        color: "grey"
      },
      {
        code: "#b9c2df",
        color: "ice-blue"
      }
    ],
    badge: null,
    image: "./assets/images/product_img8.jpg"
  }
];

container.innerHTML = `<div class="row g-3"></div>`;
let row = container.querySelector(".row");

products.forEach(product => {
  row.innerHTML +=
    `<div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card h-100 position-relative">
          <div class="image-wrapper">
            ${product.badge 
                ? `<span class="badge position-absolute top-0 start-0 m-1 rounded-0 p-2 
                    ${product.badge === "NEW" ? "bg-warning" :
                      product.badge === "HOT" ? "bg-danger" :
                      product.badge === "SALE" ? "bg-success" : "bg-secondary"}">
                      ${product.badge}
                   </span>`
                : ""
              }
            <img src="${product.image}" class="card-img-top" alt=${product.name}>
            <div class="overlay"></div>
            <div class="hover-icons">
              <i class="ri-shopping-cart-line"></i>
              <i class="ri-refresh-line"></i> 
              <i class="ri-search-line"></i>
              <i class="ri-heart-line"></i>
            </div>
          </div>
          <div class="card-body">
            <div class="product-name fw-semibold">${product.name}</div>
            <div class="d-flex align-items-center gap-2 mt-1">
              <span class="price"><strong>$${product.price.toFixed(2)}</strong></span>
              <span class="og-price"><s>$${product.oldPrice.toFixed(2)}</s></span>
              <span class="text-success dis">${product.discountPercent}% Off</span>
            </div>
            <div class="d-flex align-items-center gap-2 mb-2 rating-wrapper">
            <ul class="d-flex p-0 m-0 gap-1">
              ${generateStars(product.rating)}
            </ul>
            <small class="text-muted qty">(${product.reviews})</small>
          </div>
            <div>
              <ul class = "colours d-flex gap-2 p-0 mt-2">
                ${
                  product.colours.map((colour) => {
                    return  `<li style ="background-color: ${colour.code};" > </li>`
                  }).join("")
                }
              </ul>
            </div>
          </div>
        </div>
    </div>`
});
