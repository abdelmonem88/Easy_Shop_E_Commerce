import "./utils.js";
import {
 prelouder,
 loginUser,
 logOutUser,
 logOutBtn,
 getLocalStorage,
} from "./generalVars.js";
import { store } from "./setupStore.js";
import { allProductsDOM } from "./prodcutsDOM.js";
import "./filters.js";
import "./cart.js";
import { cartItemsDOM, cartItemsContainer } from "./cart.js";

prelouder();

window.addEventListener("DOMContentLoaded", () => {
 loginUser();
 allProductsDOM(store, "all-products");
 

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

//log our a user
logOutBtn.addEventListener("click", () => {
 prelouder();
 logOutUser();
});
