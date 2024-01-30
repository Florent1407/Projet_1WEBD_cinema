//Navbar
document.addEventListener("DOMContentLoaded", function () {
  var navbar = document.getElementById("navbar");

  window.addEventListener("scroll", function () {
    var scrollPosition = window.scrollY || document.documentElement.scrollTop;
    if (scrollPosition > 0) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});

//Bannière
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("slider");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  let slideIndex = 0;

  function showSlides(n) {
    const slides = document.getElementsByClassName("slide");

    if (n >= slides.length) {
      slideIndex = 0;
    } else if (n < 0) {
      slideIndex = slides.length - 1;
    }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slides[slideIndex].style.display = "block";
  }

  function nextSlide() {
    showSlides((slideIndex += 1));
    setTimeout(nextSlide, 6000);
  }

  leftArrow.addEventListener("click", function () {
    showSlides((slideIndex -= 1));
  });

  rightArrow.addEventListener("click", function () {
    showSlides((slideIndex += 1));
  });

  nextSlide();
});

//Films
const apiKey = "5a0c7cf2";
const baseURL = "https://www.omdbapi.com/";
const moviesContainer = document.getElementById("movies-container");

const movieList = [
  { title: "Argylle", year: 2024 },
  { title: "Avatar: The Way of Water", year: 2022 },
  { title: "Oppenheimer", year: 2023 },
  { title: "Aquaman", year: 2023 },
  { title: "Guardians of the Galaxy", year: 2023 },
  { title: "Gran Turismo", year: 2023 },
  { title: "KILLERS OF THE FLOWER MOON", year: 2023 },
  { title: "Godzilla minus one", year: null },
];

document.addEventListener("DOMContentLoaded", function () {
  movieList.forEach((movie) => {
    const url = `${baseURL}?apikey=${apiKey}&t=${encodeURIComponent(
      movie.title
    )}&y=${movie.year}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.Response === "True") {
          const movieData = {
            title: data.Title,
            poster: data.Poster,
          };

          displayMovie(movieData);
        } else {
          console.error(
            `Error "${movie.title}" (${movie.year}): Movie not found.`
          );
        }
      });
  });

  function displayMovie(movie) {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    const posterElement = document.createElement("img");
    posterElement.src = movie.poster;
    posterElement.alt = `${movie.title} Poster`;

    const titleElement = document.createElement("h2");
    titleElement.textContent = movie.title;

    movieElement.appendChild(posterElement);
    movieElement.appendChild(titleElement);

    moviesContainer.appendChild(movieElement);
  }
});
