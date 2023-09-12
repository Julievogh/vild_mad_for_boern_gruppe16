// Nav bar

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
const slideContainer = document.querySelector(".slide_container");
const slides = document.querySelectorAll(".slide");
const prevButton = document.querySelector(".btn--left");
const nextButton = document.querySelector(".btn--right");

let currentSlideIndex = 0;

// NÆSTE SLIDE
nextButton.addEventListener("click", () => {
  if (currentSlideIndex < slides.length - 1) {
    currentSlideIndex++;
  } else {
    currentSlideIndex = 0; // Reset to the first slide
  }
  scrollSlides();
});

// FORRIGE SLIDE
prevButton.addEventListener("click", () => {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
  } else {
    currentSlideIndex = slides.length - 1; // Set to the last slide
  }
  scrollSlides();
});

// CURRENT SLIDE
function scrollSlides() {
  const slideWidth = slides[currentSlideIndex].offsetWidth;
  const scrollX = slideWidth * currentSlideIndex;
  slideContainer.scrollTo({
    left: scrollX,
    behavior: "smooth",
  });
}
