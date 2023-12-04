let slideIndex = 0;
const slides = document.getElementsByClassName("slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
}

prevBtn.addEventListener("click", () => {
  slideIndex--;
  if (slideIndex < 1) {
    slideIndex = slides.length;
  }
  showSlides();
});

nextBtn.addEventListener("click", () => {
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  showSlides();
});

showSlides();
setInterval(showSlides, 5000); // Troca automática de slide a cada 5 segundos
