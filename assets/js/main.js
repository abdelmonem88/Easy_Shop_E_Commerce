import "./cart.js";
import {
 prelouder,
 loginUser,
 logOutUser,
 logOutBtn,
 getLocalStorage,
} from "./generalVars.js";
import { fetchProducts } from "./fetchProducts.js";
import { setupStore, store } from "./setupStore.js";
import { uniqueProductsDOM } from "./prodcutsDOM.js";
import { cartItemsDOM, cartItemsContainer } from "./cart.js";

prelouder();

const appStart = async () => {
 const products = await fetchProducts();
 setupStore(products);

 const featuredProducts = store.filter((item) => {
  return item.featured == "true";
 });

 const onSaleProducts = store.filter((item) => {
  return item.sale == "true";
 });

 uniqueProductsDOM(featuredProducts, "featured-products");
 //  uniqueProductsDOM(onSaleProducts, "onSale-products");
};

window.addEventListener("DOMContentLoaded", () => {
 appStart();
 loginUser();

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
