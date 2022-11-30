const menu = document.querySelector("#mobile-menu");
const menuLingks = document.querySelector(".navbar__menu");

menu.addEventListener("click", function () {
  menu.classList.toggle("is-active");
  menuLingks.classList.toggle("active");
});
