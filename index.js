const apiKey = "5a0c7cf2";
const baseURL = "https://www.omdbapi.com/";

function getMovies() {
  const url = `${baseURL}?apikey=${apiKey}&s=Avengers`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP! Statut: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      displayMovies(data.Search);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des films:", error);
    });
}

function displayMovies(movies) {
  const moviesContainer = document.getElementById("movies_container");

  if (movies && movies.length > 0) {
    movies.forEach((movie) => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("movie");

      const titleElement = document.createElement("h2");
      titleElement.textContent = movie.Title;
      movieElement.appendChild(titleElement);

      const posterElement = document.createElement("img");
      posterElement.src = movie.Poster;
      posterElement.alt = `${movie.Title} Poster`;

      posterElement.addEventListener("click", () => {
        window.location.href = `movie.html?id=${movie.imdbID}`;
      });

      movieElement.appendChild(posterElement);

      moviesContainer.appendChild(movieElement);
    });
  } else {
    moviesContainer.innerHTML = "<p>No movies found</p>";
  }
}

getMovies();

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

  leftArrow.addEventListener("click", function () {
    showSlides((slideIndex -= 1));
  });

  rightArrow.addEventListener("click", function () {
    showSlides((slideIndex += 1));
  });

  showSlides(slideIndex);
});
