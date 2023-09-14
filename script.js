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

// Hent alle faner og deres tilsvarende indholdselementer
const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");

// Lyt til klik på faner
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    // Skjul eller vis indholdet afhængigt af den aktuelle tilstand
    if (tabContents[index].classList.contains("active")) {
      tabContents[index].classList.remove("active");
    } else {
      // Skjul alt indhold
      tabContents.forEach((content) => {
        content.classList.remove("active");
      });

      // Vis kun det valgte indhold
      tabContents[index].classList.add("active");
    }
  });
});

// Hent alle bokse med klassen "box"
const boxes = document.querySelectorAll(".box");

// Hent knapperne med ID'erne "prev" og "next"
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

// Initialiser variablen currentIndex til 0
let currentIndex = 0;

// Funktion til at vise en bestemt boks ved at ændre dens klasse til "active"
function visBoks(index) {
  // Fjern "active" klassen fra alle bokse
  boxes.forEach((box) => box.classList.remove("active"));
  // Tilføj "active" klassen til den valgte boks
  boxes[index].classList.add("active");
}

// Lyt efter klik på "prev" knappen
prevButton.addEventListener("click", () => {
  // Beregn det nye index for den foregående boks
  currentIndex = (currentIndex - 1 + boxes.length) % boxes.length;
  // Vis den boks med det nye index
  visBoks(currentIndex);
});

// Lyt efter klik på "next" knappen
nextButton.addEventListener("click", () => {
  // Beregn det nye index for den næste boks
  currentIndex = (currentIndex + 1) % boxes.length;
  // Vis den boks med det nye index
  visBoks(currentIndex);
});

// Vis den første boks som standard på små skærme
visBoks(currentIndex);
