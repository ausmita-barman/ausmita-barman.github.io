const slidesContainer = document.getElementById("slides-container");
const thumbnailsContainer = document.getElementById("thumbnail-container");
const slides = document.querySelectorAll(".slide");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");

let currentSlideIndex = 0;

function updateSlide() {
  const slideWidth = slides[currentSlideIndex].clientWidth;
  slidesContainer.scrollLeft = slideWidth * currentSlideIndex;
}

nextButton.addEventListener("click", () => {
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  updateSlide();
  updateThumbnails();
});

prevButton.addEventListener("click", () => {
  currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
  updateSlide();
  updateThumbnails();
});

function goToSlide(index) {
  currentSlideIndex = index;
  updateSlide();
  updateThumbnails();
}

function updateThumbnails() {
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.classList.remove("active");
    if (index === currentSlideIndex) {
      thumbnail.classList.add("active");
    }
  });
}

const thumbnails = document.querySelectorAll(".thumbnail");
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    goToSlide(index);
  });
});
