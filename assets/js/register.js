import "./cart.js";
import { prelouder, getLocalStorage, setLocalStorage } from "./generalVars.js";

prelouder();

const form = document.getElementById("register-form");
const resgiterError = document.querySelector(".register-error");

form.addEventListener("submit", function loginUser(e) {
 e.preventDefault();
 //form validation
 const registerUserName = document.getElementById("register-username");
 const registerPassword = document.getElementById("register-password");
 const registerEmail = document.getElementById("register-email");
 const termsCheckBox = document.getElementById("terms");

 if (registerUserName.value == "") {
  registerUserName.style.border = "1px solid red";
  registerUserName.nextElementSibling.style.display = "block";
  return;
 } else {
  registerUserName.style.border = "1px solid transparent";
  registerUserName.nextElementSibling.style.display = "none";
 }

 if (registerPassword.value == "") {
  registerPassword.style.border = "1px solid red";
  registerPassword.nextElementSibling.style.display = "block";
  return;
 } else {
  registerPassword.style.border = "1px solid transparent";
  registerPassword.nextElementSibling.style.display = "none";
 }

 if (registerEmail.value == "") {
  registerEmail.style.border = "1px solid red";
  registerEmail.nextElementSibling.style.display = "block";
  return;
 } else {
  registerEmail.style.border = "1px solid transparent";
  registerEmail.nextElementSibling.style.display = "none";
 }

 if (!termsCheckBox.checked) {
  document.querySelector(".terms-error").style.display = "block";
  return;
 } else {
  document.querySelector(".terms-error").style.display = "none";
 }

 if (registerPassword.value.length < 8) {
  resgiterError.style.display = "block";
  resgiterError.textContent = "*password must be at least 8 characters";
  return;
 } else {
  resgiterError.textContent = "";
 }

 //add new user
 let newUser = {
  id: new Date().getTime(),
  username: registerUserName.value,
  password: registerPassword.value,
  email: registerEmail.value,
  cartItems: [],
  wishlist: [],
 };

 let regsiteredUsers = getLocalStorage("users");

 if (regsiteredUsers.length > 0) {
  for (let i = 0; i < regsiteredUsers.length; i++) {
   if (
    regsiteredUsers[i].username == newUser.username ||
    regsiteredUsers[i].email == newUser.email
   ) {
    resgiterError.style.display = "block";
    resgiterError.textContent = "*username / email already exists";
    return;
   } else {
    resgiterError.style.display = "none";
   }
  }
 }

 let tempCart = getLocalStorage("tempcartItems");
 if (tempCart.length != 0) {
  newUser.cartItems = tempCart;
  tempCart = [];
  setLocalStorage("tempcartItems", tempCart);
 }
 regsiteredUsers.push(newUser);
 localStorage.setItem("users", JSON.stringify(regsiteredUsers));
 window.location.replace("login.html");
});
