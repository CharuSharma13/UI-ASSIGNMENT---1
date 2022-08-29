const menuIcon = document.getElementsByClassName("burger-nav")[0];
const navbarlinks = document.getElementsByClassName("content")[0];
const container = document.querySelector(".container");
const navLink = document.querySelectorAll(".nav-link");
const pointer = document.querySelector(".pointer");
const dropdown = document.querySelector(".dropdown");
const context = document.querySelector(".content");
const dimensions = {
  products: { x: 150 },
  solution: { x: 200 },
  developers: { x: 200 },
  resources: { x: 300 },
};
function showSection(section) {
  var localSection = section.getAttribute("data-nav");
  const segment = document.querySelectorAll(".section");
  dropdown.classList.add("open");
  segment.forEach((el) => el.classList.remove("active"));
  document.querySelector(`.section-${localSection}`).classList.add("active");

  const coords = dropdown.getBoundingClientRect().x;
  let navCoords = section.getBoundingClientRect();
  dimensions[localSection].pointerX =
    navCoords.left + navCoords.width / 2 - coords;
  pointer.style.transform = `
  translateX(${dimensions[localSection].pointerX}px)
  rotate(45deg)`;

  context.style.transform = `translateX(${dimensions[localSection].x}px)`;
}

navLink.forEach((navLink) => {
  navLink.addEventListener("mouseenter", (event) => {
    let targetdropdown = event.target;
    showSection(targetdropdown);
  });
});

dropdown.addEventListener("mouseleave", () => {
  dropdown.classList.remove("open");
});

menuIcon.addEventListener("click", function () {
  dropdown.classList.toggle("open");
});

const mql = window.matchMedia("(min-width: 992px)");

mql.addEventListener("change", () => {
  dropdown.classList.remove("open");
  context.removeAttribute("style");
});
