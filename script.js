const hamburgerMenu = document.querySelector(".hamburger-menu");
const navLinks = document.querySelector(".nav-links");

function toggleMenu() {
  navLinks.classList.toggle("show");
}

hamburgerMenu.addEventListener("click", toggleMenu);

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    navLinks.classList.remove("show");
  }
});


// --- CAROUSEL --- //
const slide_container = document.getElementById("slide_container");
const slide = document.querySelector(".slide");
const prevButton = document.getElementById("btn--left");
const nextButton = document.getElementById("btn--right");

//NAVIGERE MELLEM SLIDES//
nextButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slide_container.scrollLeft += slideWidth;

});

prevButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slide_container.scrollLeft -= slideWidth;
});
