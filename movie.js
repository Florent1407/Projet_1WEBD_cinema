document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const movieTitle = params.get("t");

  if (movieTitle) {
    const apiKey = "5a0c7cf2";
    const baseURL = "https://www.omdbapi.com/";
    const url = `${baseURL}?apikey=${apiKey}&t=${encodeURIComponent(
      movieTitle
    )}`;
    console.log("API URL:", url);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        if (data && data.Response === "True") {
          const movieData = {
            title: data.Title,
            poster: data.Poster,
            summary: data.Plot,
            genre: data.Genre,
            actors: data.Actors,
            dvdRelease: data.DVD,
            rating: parseFloat(data.imdbRating) / 2,
          };

          displayMovieDetails(movieData);
        } else {
          console.error(`Error "${movieTitle}": Movie not found`);
        }
      })
      .catch((error) => {
        console.error("API Request Error:", error);
      });
  } else {
    console.error("Error: Movie title not provided in the URL.");
  }
});

const displayMovieDetails = (movie) => {
  const posterContainer = document.getElementById("movie-poster");
  const infoContainer = document.getElementById("movie-info");

  const posterElement = document.createElement("img");
  posterElement.src = movie.poster;
  posterElement.alt = `${movie.title} Poster`;
  posterElement.classList.add("movie-poster");

  const titleElement = document.createElement("h1");
  titleElement.textContent = movie.title;
  titleElement.classList.add("movie-title");

  const genreElement = document.createElement("p");
  genreElement.classList.add("movie-genre");

  movie.genre.split(", ").forEach((genre) => {
    const genreSpan = document.createElement("span");
    genreSpan.textContent = genre;
    genreSpan.classList.add("genre-tag");
    genreElement.appendChild(genreSpan);
  });

  const summaryElement = document.createElement("p");
  summaryElement.textContent = movie.summary;
  summaryElement.classList.add("movie-summary");

  const actorsElement = document.createElement("p");
  actorsElement.textContent = `Cast: ${
    Array.isArray(movie.actors) ? movie.actors.join(", ") : movie.actors
  }`;
  actorsElement.classList.add("movie-actors");

  const dvdReleaseElement = document.createElement("p");
  dvdReleaseElement.textContent = `DVD Date: ${movie.dvdRelease}`;
  dvdReleaseElement.classList.add("dvd-release");

  const ratingContainer = document.createElement("div");
  ratingContainer.classList.add("rating");

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("i");
    star.classList.add("rating__star", "far", "fa-star");
    star.dataset.value = i;
    ratingContainer.appendChild(star);
  }

  infoContainer.appendChild(ratingContainer);

  posterContainer.appendChild(posterElement);
  infoContainer.appendChild(titleElement);
  infoContainer.appendChild(genreElement);
  infoContainer.appendChild(summaryElement);
  infoContainer.appendChild(actorsElement);
  infoContainer.appendChild(dvdReleaseElement);

  Rating(movie.rating);
};

const Rating = (rating) => {
  if (!isNaN(rating)) {
    const stars = document.querySelectorAll(".rating__star");
    const roundedRating = Math.round(rating * 2) / 2;

    stars.forEach((star, index) => {
      const starValue = index + 1;
      star.classList.toggle("fas", starValue <= roundedRating);
    });
  }
};
