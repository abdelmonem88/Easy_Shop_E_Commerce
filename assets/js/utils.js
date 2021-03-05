//Change products view
const columnView = document.querySelector(".column");
const gridView = document.querySelector(".grid");
const itemsContainer = document.querySelector(".items-wrapper .items");

columnView.addEventListener("click", () => {
 itemsContainer.classList.add("column");
});
gridView.addEventListener("click", () => {
 itemsContainer.classList.remove("column");
});

//login and logout process
// export const loginAndLogout = () => {
//  const loginIconDOM = document.querySelector(".login");
//  const logedIconDOM = document.querySelector(".loged");
//  const currentUserDOM = document.querySelector(".loged .current-user");
//  const currentUser = getLocalStorage("currentUser");
//  const isLoged = getLocalStorage("isLoged");
//  const logOutBtn = document.querySelector(".logout-btn");
//  const cartDOM = document.querySelector(".cart-items");

//  if (isLoged) {
//   loginIconDOM.style.display = "none";
//   logedIconDOM.style.display = "block";
//   currentUserDOM.innerHTML = currentUser;
//  }

//  logOutBtn.addEventListener("click", () => {
//   loginIconDOM.style.display = "block";
//   logedIconDOM.style.display = "none";
//   currentUserDOM.innerHTML = "";
//   cartDOM.innerHTML = `<h3 class="no-prodcuts py-5 text-center">Ooops..your cart is empty!!</h3>`;
//  });
// };
