import { getLocalStorage, setLocalStorage } from "./generalVars.js";

let store = getLocalStorage("store");

const setupStore = (data) => {
 store = data.map((product) => {
  const { id } = product;
  const {
   fields: {
    brand,
    name,
    price,
    old_price,
    featured,
    amountInStock,
    details,
    sale,
   },
  } = product;
  const image = product.fields.attachments[0].url;

  return {
   id,
   brand,
   name,
   price,
   old_price,
   featured,
   amountInStock,
   details,
   sale,
   image,
  };
 });
 setLocalStorage("store", store);
};

const getSingleProduct = (id) => {
 singleProduct = store.map((item) => {
  return item.id === id;
 });
};

export { setupStore, store, getSingleProduct };
