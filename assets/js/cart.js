import { getLocalStorage, setLocalStorage } from "./generalVars.js";
import { store } from "./setupStore.js";

//General vars
const cart = document.querySelector(".cart");
const overlay = document.querySelector(".overlay");
const closeCart = document.querySelector(".close-cart");
const cartItemsCount = document.querySelector(".cart-items-count");
const cartTotal = document.querySelector(".cart-total");

cart.addEventListener("click", () => {
 overlay.classList.add("show");
});

closeCart.addEventListener("click", () => {
 overlay.classList.remove("show");
});

//add items to cart
const isUserLoged = getLocalStorage("isLoged");
const cartItemsContainer = document.querySelector(".cart-items");
let tempCartItems = getLocalStorage("tempCartItems");
const currentUserName = getLocalStorage("currentUser");
const allUsers = getLocalStorage("users");
const currentUserData = allUsers.find(
 (user) => user.username === currentUserName
);
let currentUserCartItems = currentUserData ? currentUserData.cartItems : [];

//Calculate amount and price totals
const getTotals = (cartItems) => {
 const itemsTotalAmount = cartItems.reduce((total, cartItem) => {
  return (total += cartItem.amountInCart);
 }, 0);
 cartItemsCount.innerHTML = itemsTotalAmount;
 const cartTotalPrice = cartItems.reduce((total, cartItem) => {
  return (total += cartItem.amountInCart * cartItem.price);
 }, 0);
 cartTotal.innerHTML = ` Total: ${cartTotalPrice} EGP`;
};

const cartItemsDOM = (cartItems, target) => {
 target.innerHTML = cartItems
  .map((cartItem) => {
   const { id, name, brand, price, image, amountInCart } = cartItem;
   return `
       <div class="cart-item d-flex">
          <div class="item-body">
             <img src="${image}" class="img-fluid" alt="">
             <div class="item-details align-self-center">
                <h4 class="item-name">${name}</h4>
                <h6 class="item-brand">${brand}</h6>
                <h5 class="item-price">${price} EGP</h5>
             </div>
          </div>
          <div class="item-amount align-self-center d-flex">
             <button class="increase btn" data-select="${id}">
                <i class="fas fa-chevron-up"></i>
             </button>
             <span class="amount">${amountInCart}</span>
             <button class="decrease btn" data-select="${id}">
                <i class="fas fa-chevron-down"></i>
             </button>
          </div>
       </div>
     `;
  })
  .join("");

 //increase and decrease functionality
 cartItemsContainer.addEventListener("click", increaseAndDecrease);
};

const increaseAmount = (increaseBtn) => {
 increaseBtn.addEventListener("click", (e) => {
  const itemD = e.target.parentElement.dataset.select;
  console.log(itemD);
 });
};

const addToCart = (items) => {
 items.forEach((item) => {
  item.addEventListener("click", (e) => {
   e.preventDefault();
   overlay.classList.add("show");
   const productID = e.target.parentElement.dataset.select;
   let currentProduct = store.find((item) => item.id === productID);

   if (isUserLoged) {
    if (!currentUserCartItems.find((item) => item.id === currentProduct.id)) {
     currentProduct = { ...currentProduct, amountInCart: 1 };
     currentUserCartItems = [...currentUserCartItems, currentProduct];
     currentUserData.cartItems = currentUserCartItems;
     setLocalStorage("users", allUsers);
     cartItemsDOM(currentUserCartItems, cartItemsContainer);
     getTotals(currentUserCartItems);
    } else {
     //modify amount for cart item
     currentUserCartItems.map((item) => {
      if (item.id === currentProduct.id) {
       item.amountInCart += 1;
      }
      currentUserData.cartItems = currentUserCartItems;
      setLocalStorage("users", allUsers);
      cartItemsDOM(currentUserCartItems, cartItemsContainer);
      getTotals(currentUserCartItems);
     });
    }
   } else {
    if (!tempCartItems.find((item) => item.id === currentProduct.id)) {
     currentProduct = { ...currentProduct, amountInCart: 1 };
     tempCartItems = [...tempCartItems, currentProduct];
     setLocalStorage("tempcartItems", tempCartItems);
     cartItemsDOM(tempCartItems, cartItemsContainer);
     getTotals(tempCartItems);
    } else {
     tempCartItems = getLocalStorage("tempcartItems");
     tempCartItems.map((item) => {
      if (item.id === currentProduct.id) {
       item.amountInCart += 1;
      }
      setLocalStorage("tempcartItems", tempCartItems);
      cartItemsDOM(tempCartItems, cartItemsContainer);
      getTotals(tempCartItems);
     });
    }
   }
  });
 });
};

const increaseAndDecrease = (e) => {
 const productID = e.target.parentElement.dataset.select;
 let productAmount;
 let cartItemAmountDOM;
 if (e.target.parentElement.classList.contains("increase")) {
  currentUserCartItems.map((cartItem) => {
   if (cartItem.id == productID) {
    cartItem.amountInCart += 1;
    productAmount = cartItem.amountInCart;
   }
  });
  const currentItem = currentUserCartItems.find((cartItem) => {
   return cartItem.id == productID;
  });
  const cartItemAmount = currentItem.amountInCart;
  cartItemAmountDOM = e.target.parentElement.nextElementSibling;
  cartItemAmountDOM.innerHTML = cartItemAmount;
  getTotals(currentUserCartItems);
  setLocalStorage("users", allUsers);
 }

 if (e.target.parentElement.classList.contains("decrease")) {
  currentUserCartItems.map((cartItem) => {
   if (cartItem.id == productID && cartItem.amountInCart > 0) {
    cartItem.amountInCart -= 1;
    productAmount = cartItem.amountInCart;
   }
  });
  const currentItem = currentUserCartItems.find((cartItem) => {
   return cartItem.id == productID;
  });
  const cartItemAmount = currentItem.amountInCart;
  cartItemAmountDOM = e.target.parentElement.previousElementSibling;
  if (cartItemAmount > 0) {
   cartItemAmountDOM.innerHTML = cartItemAmount;
   getTotals(currentUserCartItems);
   setLocalStorage("users", allUsers);
  } else {
   e.target.parentElement.parentElement.parentElement.remove();
   getTotals(currentUserCartItems);
   const filtercartItems = currentUserCartItems.filter((cartItem) => {
    return cartItem.amountInCart != 0;
   });
   currentUserData.cartItems = filtercartItems;
   setLocalStorage("users", allUsers);
   if (filtercartItems.length == 0) {
    cartItemsContainer.innerHTML = `<h3 class="no-prodcuts py-5 text-center">Ooops..your cart is empty!!</h3>`;
   }
  }
 }
};

export { addToCart, cartItemsDOM, cartItemsContainer };
