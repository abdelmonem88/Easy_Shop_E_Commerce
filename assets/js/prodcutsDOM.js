import { addToCart } from "./cart.js";

let items;

//Display products in DOM
const uniqueProductsDOM = (data, ele) => {
 const element = document.getElementById(ele);
 const products = data
  .map((item) => {
   const { id, name, image, price, brand } = item;

   return `
    <div class="col-md-4 col-sm-8">
    <div class="card item featured-item">
       <img src="${image}" alt="...">
       <div class="card-body item-body">
          <h3 class="card-title">${name}</h5>
             <h5>${brand}</h5>
             <h4>${price} EGP</h4>
             <a href="./pages/single-product.html?id=${id}" class="btn link details-btn">More
                Details</a>
             <div class="item-btns d-flex flex-column">
             <a href="#" class="add-to-cart" data-select="${id}"><i class="fas fa-shopping-cart"></i></a>
             </div>
       </div>
    </div>
 </div>
    `;
  })
  .join("");

 element.innerHTML = products;
 items = document.querySelectorAll(".featured-item .add-to-cart");
 addToCart(items);
 return;
};

// const onSaleProductsDOM = (data, ele) => {
//  const element = document.getElementById(ele);
//  const products = data
//   .map((item) => {
//    const { id, name, image, price, old_price, brand } = item;
//    return `
//     <div class="col-md-4 col-sm-8 mx-auto">
//     <div class="card item">
//        <img src="${image}" alt="...">
//        <div class="card-body item-body">
//           <h3 class="card-title">${name}</h5>
//              <h5>${brand}</h5>
//              <h4>${price} EGP</h4>
//              <h5 style="text-decoration: line-through;">${old_price} EGP</h5>
//              <a href="./pages/single-product.html?id=${id}" class="btn link details-btn">More
//                 Details</a>
//              <div class="item-btns d-flex flex-column">
//              <a href="#" class="add-to-cart" data-select="${id}"><i class="fas fa-shopping-cart"></i></a>
//                 <a href="#" class="add-to-wishlist"><i class="fas fa-heart"></i></a>
//              </div>
//        </div>
//     </div>
//  </div>
//     `;
//   })
//   .join("");

//  element.innerHTML = products;
//  items = document.querySelectorAll(".item .add-to-cart");
//  addToCart(items);
// };

const allProductsDOM = (data, ele) => {
 const element = document.getElementById(ele);
 const products = data
  .map((item) => {
   const { id, name, image, price, brand } = item;
   return `
   <div class="col-lg-4 col-md-10 col-sm-10">
    <div class="card item">
       <img src="${image}" alt="...">
       <div class="card-body item-body">
          <h3 class="card-title">${name}</h5>
             <h5>${brand}</h5>
             <h4>${price} EGP</h4>
             <a href="./single-product.html?id=${id}" class="btn link details-btn">More
                Details</a>
             <div class="item-btns d-flex flex-column">
                <a href="#" class="add-to-cart" data-select="${id}"><i class="fas fa-shopping-cart"></i></a>
             </div>
       </div>
    </div>
 </div>
    `;
  })
  .join("");

 element.innerHTML = products;
 items = document.querySelectorAll(".item .add-to-cart");
 addToCart(items);
};

export { uniqueProductsDOM, allProductsDOM };

//<a href="#" class="add-to-wishlist"><i class="fas fa-heart"></i></a>
