document.addEventListener('DOMContentLoaded', function () {

    async function GetProducts(){
        let product_grid = document.querySelector(".product-grid.compact-view");

        try {
            const response = await fetch("http://localhost/AgriMarket/backend/products/get_products_buyer.php");
            const data = await response.json();

            data.forEach(product => {
                let product_card = document.createElement('div');
                product_card.setAttribute("class", "product-card");

                let discount_style = (product.discount > 0) ? "block" : "none";
                let discounted_price = product.price - (product.price * product.discount / 100);

                product_card.innerHTML = (`
                    <div class="product-card">
                        <div class="product-badges">
                            <span class="badge ${product.category}">${product.category}</span>
                            <span class="badge discount" style="display: ${discount_style}">-${product.discount}%</span>
                        </div>
                        <div class="product-image">
                            <img src="../../../uploads/product-images/product1.jpg" alt="Product image">
                            <button class="wishlist-btn"><i class="far fa-heart"></i></button>
                        </div>
                        <div class="product-info">
                            <h3>${product.product_name}</h3>
                            <div class="price">
                                <span class="current-price">R ${discounted_price} / ${product.weight}</span>
                                <span class="original-price" style="display: ${discount_style}">R ${product.price}</span>
                            </div>
                            <div class="supplier-info">
                                <div class="rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star-half-alt"></i>
                                    <span>4.5</span>
                                </div>
                                <div class="supplier-name">${product.full_name}</div>
                                <div class="supplier-location"><i class="fas fa-map-marker-alt"></i> 15km away</div>
                            </div>
                            <div class="product-actions">
                                <button class="view-btn">View Details</button>
                                <button class="cart-btn"><i class="fas fa-cart-plus"></i></button>
                            </div>
                        </div>
                    </div>
                `);

                product_grid.appendChild(product_card);
            });
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    // Track the current base currency
    let currentCurrency = "ZAR"; // default is Rand

    // Handle dropdown selection
    document.querySelectorAll(".dropdown-menu a").forEach(item => {
        item.addEventListener("click", async function(e) {
            e.preventDefault();

            document.querySelectorAll(".dropdown-menu a").forEach(link => link.classList.remove("active"));
            this.classList.add("active");

            const toCurrency = this.dataset.currency;
            document.getElementById("selected-currency").innerText = toCurrency;

            const productCards = document.querySelectorAll('.product-card');
            const fromCurrency = currentCurrency;

            for (let card of productCards) {
                const currentPriceEl = card.querySelector('.price');
                const originalPriceEl = card.querySelector('.original-price');

                // --- Current Price ---
                if (currentPriceEl) {
                    let text = currentPriceEl.innerText; 
                    let [pricePart, weightPart] = text.split(" / "); 
                    let amount = pricePart.replace(/[^0-9.]/g, ''); 

                    // show loader
                    currentPriceEl.innerHTML = `<span class="price-loader"></span>`;

                    let converted = await convertCurrency(amount, fromCurrency, toCurrency);

                    if (toCurrency === "USD") {
                        currentPriceEl.innerText = "$ " + converted.toFixed(2) + " / " + weightPart;
                    } else if (toCurrency === "EUR") {
                        currentPriceEl.innerText = "€ " + converted.toFixed(2) + " / " + weightPart;
                    } else {
                        currentPriceEl.innerText = "R " + Math.round(converted) + " / " + weightPart;
                    }
                }

                // --- Original Price ---
                if (originalPriceEl && originalPriceEl.style.display !== "none") {
                    let amount = originalPriceEl.innerText.replace(/[^0-9.]/g, ''); 

                    // show loader
                    originalPriceEl.innerHTML = `<span class="price-loader"></span>`;

                    let converted = await convertCurrency(amount, fromCurrency, toCurrency);

                    if (toCurrency === "USD") {
                        originalPriceEl.innerText = "$ " + converted.toFixed(2);
                    } else if (toCurrency === "EUR") {
                        originalPriceEl.innerText = "€ " + converted.toFixed(2);
                    } else {
                        originalPriceEl.innerText = "R " + converted.toFixed(2);
                    }
                }
            }

            currentCurrency = toCurrency;
        });
    });

    // Conversion function
    async function convertCurrency(amount, fromCurrency, toCurrency) {
        const amt = parseFloat(amount);
        if (!amt) return 0;

        if (fromCurrency === toCurrency) {
            return amt;
        }

        const response = await fetch(
            `https://api.frankfurter.app/latest?amount=${amt}&from=${fromCurrency}&to=${toCurrency}`
        );
        const data = await response.json();
        return data.rates[toCurrency];
    }

    // Load products initially
    GetProducts();
});