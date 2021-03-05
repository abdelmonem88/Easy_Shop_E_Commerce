import "./cart.js";
import { prelouder, getLocalStorage, setLocalStorage } from "./generalVars.js";

prelouder();

const form = document.getElementById("login-form");
const loginUserName = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");
const loginError = document.querySelector(".login-error");
let userNameValue = "";
setLocalStorage("currentUser", userNameValue);
let isLoged = false;
setLocalStorage("isLoged", isLoged);

form.addEventListener("submit", function loginUser(e) {
 e.preventDefault();
 //form validation
 if (loginUserName.value === "") {
  loginUserName.style.border = "1px solid red";
  loginUserName.nextElementSibling.style.display = "block";
 } else {
  loginUserName.style.border = "1px solid transparent";
  loginUserName.nextElementSibling.style.display = "none";
 }
 if (loginPassword.value === "") {
  loginPassword.style.border = "1px solid red";
  loginPassword.nextElementSibling.style.display = "block";
  return;
 } else {
  loginPassword.style.border = "1px solid transparent";
  loginPassword.nextElementSibling.style.display = "none";
 }

 //check if user already registered or not
 const registredUsers = getLocalStorage("users");
 for (let i = 0; i < registredUsers.length; i++) {
  if (
   registredUsers[i].username === loginUserName.value &&
   registredUsers[i].password === loginPassword.value
  ) {
   userNameValue = loginUserName.value;
   setLocalStorage("currentUser", userNameValue);
   isLoged = true;
   setLocalStorage("isLoged", isLoged);
   window.location.replace("../index.html");
   return;
  }
 }
 loginError.style.display = "block";
});
