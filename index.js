document.addEventListener("DOMContentLoaded", function () {
  // Navbar
  var navbar = document.getElementById("navbar");
  window.addEventListener("scroll", function () {
    var scrollPosition = window.scrollY || document.documentElement.scrollTop;
    if (scrollPosition > 0) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Bannière
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

  // Films
  const apiKey = "5a0c7cf2";
  const baseURL = "https://www.omdbapi.com/";

  let totalMoviesDisplayed = 0;

  const movieList = [
    { title: "Argylle", year: 2024 },
    { title: "Avatar: The Way of Water", year: 2022 },
    { title: "Oppenheimer", year: 2023 },
    { title: "Aquaman", year: 2023 },
    { title: "Guardians of the Galaxy", year: 2023 },
    { title: "Gran Turismo", year: 2023 },
    { title: "KILLERS OF THE FLOWER MOON", year: 2023 },
    { title: "Godzilla minus one", year: null },
    { title: "Mars express", year: 2023 },
    { title: "The Super Mario Bros", year: 2023 },
    { title: "Anyone but You", year: 2023 },
    { title: "May December", year: 2023 },
    { title: "Napoléon", year: 2023 },
    { title: "The Iron Claw", year: 2023 },
    { title: "Légua", year: 2023 },
    { title: "Wish", year: 2023 },
  ];

  movieList.forEach((movie, index) => {
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
            summary: data.Plot,
          };

          displayMovie(movieData, index);
        } else {
          console.error(
            `Error "${movie.title}" (${movie.year}): Movie not found.`
          );
        }
      });
  });

  function displayMovie(movie, index) {
    if (index >= totalMoviesDisplayed) {
      const movieElement = document.createElement("div");
      movieElement.classList.add("movie");

      const posterElement = document.createElement("img");
      posterElement.src = movie.poster;
      posterElement.alt = `${movie.title} Poster`;

      const titleElement = document.createElement("h2");
      titleElement.textContent = movie.title;

      const summaryElement = document.createElement("p");
      summaryElement.textContent = movie.summary;

      movieElement.appendChild(posterElement);
      movieElement.appendChild(titleElement);
      movieElement.appendChild(summaryElement);

      movieElement.addEventListener("click", function () {
        window.location.href = `movie.html?title=${encodeURIComponent(
          movie.title
        )}`;
      });

      //Bouton +/- films
      document
        .getElementById("load-more")
        .addEventListener("click", function () {
          document.getElementById("movies-row-3").style.display = "flex";
          document.getElementById("movies-row-4").style.display = "flex";
          document.getElementById("load-more").style.display = "none";
          document.getElementById("load-less").style.display = "flex";
        });

      document
        .getElementById("load-less")
        .addEventListener("click", function () {
          document.getElementById("movies-row-3").style.display = "none";
          document.getElementById("movies-row-4").style.display = "none";
          document.getElementById("load-less").style.display = "none";
          document.getElementById("load-more").style.display = "flex";
        });

      // Distribue les films
      const currentRow = Math.floor(index / 4) + 1;
      const newRow = document.getElementById(`movies-row-${currentRow}`);
      newRow.appendChild(movieElement);
    }
  }
});
