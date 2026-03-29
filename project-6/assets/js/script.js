let form = document.getElementById("productForm");

const getProducts = () => {
    return JSON.parse(localStorage.getItem("products")) || [];
};


if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let prdName = document.getElementById("prdName").value;
        let prdPrice = document.getElementById("prdPrice").value;
        let prdUrl = document.getElementById("prdUrl").value;

        let products = getProducts();

        products.push({ id: Date.now(), prdName, prdPrice, prdUrl });

        localStorage.setItem("products", JSON.stringify(products));
        toast()
        form.reset();
    });
}

const toast = () => {
    const t = document.getElementById('toast');
    t.classList.add('show');
    setTimeout(() => {
        t.classList.remove('show');
    }, 2000);
}
displayProducts();

// window.deleteProduct = function(index){
//     products.splice(index,1);
//     localStorage.setItem("products", JSON.stringify(products));
// }

