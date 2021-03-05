import "./cart.js";
import {
 prelouder,
 loginUser,
 logOutUser,
 logOutBtn,
 getLocalStorage,
} from "./generalVars.js";
import { store } from "./setupStore.js";
import { cartItemsDOM, cartItemsContainer } from "./cart.js";

const productID = window.location.search.slice(4);
const singleProduct = store.find((item) => item.id === productID);
const singleProductDOM = document.getElementById("single-product");

const getSingleProduct = () => {
 const { name, price, old_price, brand, details, image } = singleProduct;

 singleProductDOM.innerHTML = `
 <div class="col-md-3 col-12">
 <img class="img-fluid" src="${image}" alt="">
</div>
<div class="col-md-9 col-12">
 <div class="product-details">
    <h2 class="product-name mb-2 fs-1">${name}</h2>
    <h5 class="product-brand mb-2">${brand}</h5>
    <h4 class="product-price mb-2">${price} EGP</h4>
    <h5 class="product-old-price mb-2">${
     old_price ? old_price + " EGP" : ""
    } </h5>
    <p class="product-desc mb-2">${details}</p>
 </div>
</div>
 `;
};

window.addEventListener("DOMContentLoaded", () => {
 prelouder();
 loginUser();
 getSingleProduct();

 const LogedUser = getLocalStorage("isLoged");
 const cartTotal = document.querySelector(".cart-total");

 if (LogedUser) {
  const allUsers = getLocalStorage("users");
  const currentUser = getLocalStorage("currentUser");
  const currentUserData = allUsers.find((user) => user.username == currentUser);
  const currentUserCartItems = currentUserData.cartItems;
  if (currentUserCartItems.length > 0) {
   cartItemsDOM(currentUserCartItems, cartItemsContainer);
   const itemsTotalAmount = currentUserCartItems.reduce((total, cartItem) => {
    return (total += cartItem.amountInCart);
   }, 0);

   const cartItemsCount = document.querySelector(".cart-items-count");
   cartItemsCount.innerHTML = itemsTotalAmount;
   const cartTotalPrice = currentUserCartItems.reduce((total, cartItem) => {
    return (total += cartItem.amountInCart * cartItem.price);
   }, 0);

   cartTotal.innerHTML = ` Total: ${cartTotalPrice} EGP`;
  } else {
   cartItemsContainer.innerHTML = `<h3 class="no-prodcuts py-5 text-center">Ooops..your cart is empty!!</h3>`;
   cartTotal.innerHTML = ` Total: 0 EGP`;
  }
 }
});

logOutBtn.addEventListener("click", () => {
 prelouder();
 logOutUser();
});
