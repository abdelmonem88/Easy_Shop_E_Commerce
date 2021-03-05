import { URL } from "./generalVars.js";

const fetchProducts = async () => {
 try {
  const response = await fetch(URL);
  if (response) {
   const data = await response.json();
   return data;
  }
 } catch (error) {
  console.log(error);
 }
};

export { fetchProducts };
