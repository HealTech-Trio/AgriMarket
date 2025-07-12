// document.addEventListener('DOMContentLoaded', function () {
//     const farmersNearMeLinks = document.querySelectorAll('.farmers-near');
//     const buyerProducts = document.querySelector('.buyer-products');
//     const farmersNearContent = document.querySelector('.farmers-near-me-content');

//     // Ensure both sections are found
//     if (!buyerProducts || !farmersNearContent) {
//         console.warn("Missing either .buyer-products or .farmers-near-me-content container.");
//         return;
//     }

//     // Hide farmers content initially
//     farmersNearContent.style.display = 'none';

//     farmersNearMeLinks.forEach(link => {
//         link.addEventListener('click', function (e) {
//             e.preventDefault();

//             // Hide main product section
//             buyerProducts.style.display = 'none';

//             // Show the farmers near me section
//             farmersNearContent.style.display = 'block';

//             // Scroll to top
//             window.scrollTo({
//                 top: 0,
//                 behavior: 'smooth'
//             });

//             // Active state update
//             document.querySelectorAll('.main-links a').forEach(link => link.classList.remove('active'));
//             this.classList.add('active');
//         });
//     });

//     // Optional: Return back to homepage from within .farmers-near-me-content
//     const backToHomeLink = document.querySelector('.go-home');
//     if (backToHomeLink) {
//         backToHomeLink.addEventListener('click', function (e) {
//             e.preventDefault();
//             farmersNearContent.style.display = 'none';
//             buyerProducts.style.display = 'block';
//             window.scrollTo({ top: 0, behavior: 'smooth' });
//         });
//     }
// });

let product_grid = document.querySelector(".product-grid.compact-view")

fetch("http://localhost/AgriMarket/backend/products/get_products_buyer.php")
    .then(response => response.json())
    .then(data => {

        data.forEach(product => {
            let product_card = document.createElement('div');
            product_card.setAttribute("class", "product-card");

            let discount_style = "";
            if(product.discount > 0){
                discount_style = "block";
            }
            else{
                discount_style = "none";
            }
            let discounted_price = product.price - (product.price * product.discount / 100)

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
                            <span class="original-price">R ${product.price}</span>
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
                            <div class="supplier-name">${product.farm_name}</div>
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
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
