// Navbar store link dropdown
const btnStoreDropdown = document.getElementById("store__dropdown-btn");
const btnStoreList = document.getElementById("store__dropdown-ul");
btnStoreList.style.display = "none";
btnStoreDropdown.addEventListener("click", (event) => {
  if (btnStoreList.style.display == "none") {
    btnStoreList.style.display = "block";
  } else {
    btnStoreList.style.display = "none";
  }
});

// Mobile version hamburger bars
const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");

menu.addEventListener("click", function () {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
});

function fetchData() {
  fetch(
    "https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
  )
    .then((response) => {
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const html = data
        .filter((item) => item.price < 5.0)
        .map((nameOrPrice) => {
          console.log(nameOrPrice);

          // if (element.classList.contains('carousel__slide current-slide'))
          return `
          <li class="carousel__slide current-slide" id="data1">
          <p id="data__name">${nameOrPrice.name}</p>
          <p id="data__price">— ${nameOrPrice.price}</p>
          </li>

          `;
        })
        .join("");
      console.log(html);
      document.querySelector("#data").insertAdjacentHTML("afterbegin", html);

      // Carousel
      const track = document.querySelector(".carousel__track");
      const slides = Array.from(track.children);
      const nextButton = document.querySelector(".carousel__button--right");
      const prevButton = document.querySelector(".carousel__button--left");
      const dotsNav = document.querySelector(".carousel__nav");
      const dots = Array.from(dotsNav.children);
      // const liClassChange = document.querySelector(".carousel__slide");

      // Functions & Slides next to one another
      // const setSlidePosition = (slide, index) => {
      //   slide.style.left = slideWidth * index + "px";
      // };
      // slides.forEach(setSlidePosition);
      slides[0].style.left = 0;
      slides[1].style.left = "400px";
      slides[2].style.left = "800px";

      const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = "translateX(-" + targetSlide.style.left + ")";
        currentSlide.classList.remove("current-slide");
        targetSlide.classList.add("current-slide");
      };

      const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove("current-slide");
        targetDot.classList.add("current-slide");
      };

      const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
        if (targetIndex === 0) {
          prevButton.classList.add("is-hidden");
          nextButton.classList.remove("is-hidden");
        } else if (targetIndex === slides.length - 1) {
          prevButton.classList.remove("is-hidden");
          nextButton.classList.add("is-hidden");
        } else {
          prevButton.classList.remove("is-hidden");
          nextButton.classList.remove("is-hidden");
        }
      };

      // Click left
      prevButton.addEventListener("click", (e) => {
        const currentSlide = track.querySelector(".current-slide");
        const prevSlide = currentSlide.previousElementSibling;
        const currentDot = dotsNav.querySelector(".current-slide");
        const prevDot = currentDot.previousElementSibling;
        const prevIndex = slides.findIndex((slide) => slide === prevSlide);

        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
        hideShowArrows(slides, prevButton, nextButton, prevIndex);
      });

      // Click right
      nextButton.addEventListener("click", (e) => {
        const currentSlide = track.querySelector(".current-slide");
        const nextSlide = currentSlide.nextElementSibling;
        const currentDot = dotsNav.querySelector(".current-slide");
        const nextDot = currentDot.nextElementSibling;
        const nextIndex = slides.findIndex((slide) => slide === nextSlide);

        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
        hideShowArrows(slides, prevButton, nextButton, nextIndex);
      });

      // Dot indicator moves (lights up) by click to current slide
      dotsNav.addEventListener("click", (e) => {
        // indicator on what what slide?
        const targetDot = e.target.closest("button");

        if (!targetDot) return;

        const currentSlide = track.querySelector(".current-slide");
        const currentDot = dotsNav.querySelector(".current-slide");
        const targetIndex = dots.findIndex((dot) => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(track, currentSlide, targetSlide);

        updateDots(currentDot, targetDot);
        hideShowArrows(slides, prevButton, nextButton, targetIndex);

        // console.log(targetIndex);
        // if (targetIndex >= 1) {
        //   liClassChange.classList.remove("current-slide");
        // } else {
        //   liClassChange.classList.add("current-slide");
        // }
      });
      console.log(slides);
    });
}

fetchData();
