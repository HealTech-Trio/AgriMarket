let products = document.querySelector(".products")

fetch("http://localhost/AgriMarket/backend/products/get_products_index.php")
    .then(response => response.json())
    .then(data => {

        data.forEach(product => {
            let product_card = document.createElement('div');
            product_card.setAttribute("class", "product-card");

            product_card.innerHTML = (`
                <div class="product-card">
                    <div class="product-image">
                        <img src=${product.product_image_url} alt="Fresh Apples">
                        <span class="stock-badge">${product.quantity}</span>
                    </div>
                    <div class="product-info">
                        <h3>${product.product_name}</h3>
                        <div class="price">R${product.price} / ${product.weight}</div>
                        <div class="supplier-info">
                            <div class="supplier-name">${product.farm_name}</div>
                            <div class="supplier-location">${product.location}</div>
                        </div>
                        <div class="product-actions">
                            <button class="contact-btn">Contact Supplier</button>
                            <button class="order-btn">Order Now</button>
                        </div>
                    </div>
                </div>
            `);

            products.appendChild(product_card);
            
        });
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
