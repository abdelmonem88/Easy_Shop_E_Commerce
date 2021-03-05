import { store } from "./setupStore.js";
import { allProductsDOM } from "./prodcutsDOM.js";

const nameFilter = document.getElementById("name-filter");
const allProductsContainer = document.getElementById("all-products");
const brandsContainer = document.getElementById("barnds-container");
const filterBtns = document.querySelectorAll(".filter-btn");

//Search by name filter
nameFilter.addEventListener("keyup", () => {
 const nameFilteredItems = store.filter((item) => {
  if (
   item.name.toLowerCase().includes(nameFilter.value.toLowerCase().trim()) ==
   true
  ) {
   return item;
  }
 });

 if (nameFilteredItems.length > 0) {
  allProductsDOM(nameFilteredItems, "all-products");
 } else {
  allProductsContainer.innerHTML = `<h2 class="text-center">Sorry, no products matchs your search</h2>`;
 }
});

//Brand filter
filterBtns.forEach((btn) => {
 btn.addEventListener("click", (e) => {
  let brandFiltredItems;
  const brandFilter = e.target.dataset.filter;

  if (brandFilter !== "all") {
   brandFiltredItems = store.filter((item) => {
    if (item.brand == brandFilter) {
     return item;
    }
   });
   console.log(store);
   allProductsDOM(brandFiltredItems, "all-products");
  } else {
   allProductsDOM(store, "all-products");
  }
 });
});
