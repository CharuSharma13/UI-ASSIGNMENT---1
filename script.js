const sectionEls = document.querySelectorAll(".section");
const headerEl = document.querySelector(".container");
const navLinkEls = document.querySelectorAll(".nav-link");
const popoverEl = document.querySelector(".popover");
const contentEl = document.querySelector(".content");
const arrowEl = document.querySelector(".arrow");
const backgroundEl = document.querySelector(".background");

const sections = ["products", "solution", "developers", "resources"];

const dimensions = {
  products: { width: 500, height: 480, x: 150 },
  solution: { width: 400, height: 300, x: 280 },
  developers: { width: 420, height: 350, x: 340 },
  resources: { width: 380, height: 280, x: 400 },
};

const popoverLeft = popoverEl.getBoundingClientRect().x;

navLinkEls.forEach((navLink) => {
  let section = navLink.getAttribute("data-nav");
  let rect = navLink.getBoundingClientRect();
  dimensions[section].arrowX = rect.left + rect.width / 2 - popoverLeft;
});

arrowEl.style.transform = `
translateX(${dimensions.products.arrowX}px)
rotate(45deg)`;

function showSection(section) {
  popoverEl.classList.add("open");
  sectionEls.forEach((el) => el.classList.remove("active"));
  document.querySelector(`.section-${section}`).classList.add("active");

  arrowEl.style.transform = `
translateX(${dimensions[section].arrowX}px)
rotate(45deg)`;

  backgroundEl.style.transform = `
translateX(${dimensions[section].x}px)
scaleX(${dimensions[section].width / dimensions["products"].width})
scaleY(${dimensions[section].height / dimensions["products"].height})
`;

  contentEl.style.width = dimensions[section].width + "px";
  contentEl.style.height = dimensions[section].height + "px";

  contentEl.style.transform = `translateX(${dimensions[section].x}px)`;
}

navLinkEls.forEach((navLink) => {
  navLink.addEventListener("mouseenter", (event) => {
    let targetPopover = event.target.getAttribute("data-nav");
    showSection(targetPopover);
  });
});

headerEl.addEventListener("mouseleave", () => {
  popoverEl.classList.remove("open");
});

const menuIcon = document.getElementsByClassName("burger-nav")[0];
const navbarlinks = document.getElementsByClassName("content")[0];
menuIcon.addEventListener("click", function () {
  navbarlinks.classList.toggle("open");
});
