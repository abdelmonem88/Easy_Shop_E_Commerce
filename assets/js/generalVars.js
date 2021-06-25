//preloader
const prelouder = () => {
 const prolouderWrapper = document.querySelector(".prolouder-wrapper");
 setTimeout(() => {
  prolouderWrapper.classList.add("hide");
 }, 1000);
};

//get data from localStorage
const getLocalStorage = (item) => {
 let storageItem = localStorage.getItem(item);
 if (storageItem) {
  storageItem = JSON.parse(localStorage.getItem(item));
 } else {
  storageItem = [];
 }
 return storageItem;
};

//set data to localStorage.
const setLocalStorage = (item, value) => {
 localStorage.setItem(item, JSON.stringify(value));
};

//login and logout
const loginIconDOM = document.querySelector(".login");
const logedIconDOM = document.querySelector(".loged");
const currentUserDOM = document.querySelector(".loged .current-user");
const currentUser = getLocalStorage("currentUser");
const isLoged = getLocalStorage("isLoged");
const logOutBtn = document.querySelector(".logout-btn");

const loginUser = () => {
 if (isLoged) {
  loginIconDOM.style.display = "none";
  logedIconDOM.style.display = "block";
  currentUserDOM.innerHTML = currentUser;
 }
};

const logOutUser = () => {
 loginIconDOM.style.display = "block";
 logedIconDOM.style.display = "none";
 currentUserDOM.innerHTML = "";
 setLocalStorage("isLoged", false);
 setLocalStorage("currentUser", "");
};

const URL = "https://smartphones-api.netlify.app/api/products";

export {
 prelouder,
 getLocalStorage,
 setLocalStorage,
 loginUser,
 logOutUser,
 logOutBtn,
 URL,
};
