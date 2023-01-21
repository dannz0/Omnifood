/////////////////////////////////////////////////////////////////
// Global variables/elements //

const body = document.querySelector("body");
const headerEl = document.querySelector(".header");
const heroEl = document.querySelector(".section-hero");
const yearEl = document.querySelector(".year");

const observerSettings = {
  root: null,
  rootMargin: "-80px",
  threshold: 0,
  behavior: "smooth",
};

const stickyNavScrollTop = {
  top: 0,
  left: 0,
  behavior: "smooth",
};

/////////////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions //

function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}

/////////////////////////////////////////////////////////////////
// Set cur year in footer //

const getCurYearFooter = function () {
  const currentYear = new Date().getFullYear();
  yearEl.textContent = currentYear;
};

/////////////////////////////////////////////////////////////////
// Mobile nav //

const getMobileNav = function () {
  const btn = document.querySelector(".btn-mobile-nav");

  btn.addEventListener("click", function () {
    headerEl.classList.toggle("nav-open");
  });
};

/////////////////////////////////////////////////////////////////
// Smooth scrolling //

const smoothScrolling = function () {
  body.addEventListener("click", function (e) {
    e.preventDefault();
    const target =
      e.target.getAttribute("href") ||
      e.target.parentElement.getAttribute("href");
    const section = document.querySelector(target);

    if (!target) return;

    if (e.target.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");

    if (target === "#header") window.scrollTo(stickyNavScrollTop);

    section.scrollIntoView({ behavior: "smooth" });
  });
};

/////////////////////////////////////////////////////////////////
// Sticky nav //

const stickyNav = function (entries) {
  const ent = entries[0];

  !ent.isIntersecting
    ? body.classList.add("sticky")
    : body.classList.remove("sticky");
};

const stickyNavObserver = function () {
  const observer = new IntersectionObserver(stickyNav, observerSettings);
  observer.observe(heroEl);
};

/////////////////////////////////////////////////////////////////
// Initialization //

const init = function () {
  checkFlexGap();
  getCurYearFooter();
  getMobileNav();
  smoothScrolling();
  stickyNavObserver();
};
init();
console.log("Welcome to Omnifood!");

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js
