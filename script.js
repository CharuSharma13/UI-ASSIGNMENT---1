const menuIcon = document.getElementsByClassName("burger-nav")[0];
const navbarlinks = document.getElementsByClassName("content")[0];
const container = document.querySelector(".container");
const navLink = document.querySelectorAll(".nav-link");
const pointer = document.querySelector(".pointer");
const dropdown = document.querySelector(".dropdown");
const context = document.querySelector(".content");
const dimensions = {
  products: { width: 500, height: 480, x: 150 },
  solution: { width: 400, height: 300, x: 280 },
  developers: { width: 420, height: 350, x: 340 },
  resources: { width: 380, height: 280, x: 400 },
};

navLink.forEach((navLink) => {
  const coords = dropdown.getBoundingClientRect().x;
  let navItems = navLink.getAttribute("data-nav");
  let navCoords = navLink.getBoundingClientRect();
  dimensions[navItems].pointerX = navCoords.left + navCoords.width / 2 - coords;
});

pointer.style.transform = `
translateX(${dimensions.products.pointerX}px)
rotate(45deg)`;

function showSection(section) {
  const surround = document.querySelector(".background");
  const segment = document.querySelectorAll(".section");
  dropdown.classList.add("open");
  segment.forEach((el) => el.classList.remove("active"));
  document.querySelector(`.section-${section}`).classList.add("active");

  pointer.style.transform = `
translateX(${dimensions[section].pointerX}px)
rotate(45deg)`;

  surround.style.transform = `
translateX(${dimensions[section].x}px)
scaleX(${dimensions[section].width / dimensions["products"].width})
scaleY(${dimensions[section].height / dimensions["products"].height})
`;

  context.style.width = dimensions[section].width + "px";
  context.style.height = dimensions[section].height + "px";

  context.style.transform = `translateX(${dimensions[section].x}px)`;
}

navLink.forEach((navLink) => {
  navLink.addEventListener("mouseenter", (event) => {
    let targetdropdown = event.target.getAttribute("data-nav");
    showSection(targetdropdown);
  });
});

container.addEventListener("mouseleave", () => {
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
