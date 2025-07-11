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
