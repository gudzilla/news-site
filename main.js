const menuButton = document.querySelector("#mobileMenuButton");
const headerNav = document.querySelector("#headerNav");

menuButton.addEventListener("click", function () {
  menuButton.classList.toggle("mobile-menu-button_active");
  headerNav.classList.toggle("navbar_mobile");
});
