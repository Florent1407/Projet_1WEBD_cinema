document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "5a0c7cf2";
  const baseURL = "https://www.omdbapi.com/";

  let movieNameRef = document.getElementById("movie-input");
  let resultContainer = document.getElementById("result");
  let searchBtn = document.getElementById("button-search");
  let previousBtn = document.getElementById("previous-btn");
  let nextBtn = document.getElementById("next-btn");

  let currentPage = 1;
  const resultsPerPage = 8;
  let totalResults = 0;

  let getMovie = () => {
    let movieName = movieNameRef.value.trim();

    if (movieName.length === 0) {
      displayMessage("Merci d'entrer un nom de film jeune padawan");
      return;
    }

    let url = `${baseURL}?s=${movieName}&page=${currentPage}&apikey=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => movieData(data))
      .catch((error) => {
        displayMessage("Erreur détectée");
      });
  };

  let displayMessage = (message) => {
    resultContainer.innerHTML = `<h3 class="msg">${message}</h3>`;
    updateButtons();
  };

  let movieData = (data) => {
    if (data.Response === "True") {
      totalResults = parseInt(data.totalResults);
      resultContainer.innerHTML = "";

      const moviesToDisplay = data.Search.slice(0, resultsPerPage);

      moviesToDisplay.forEach((movie) => {
        if (movie.Poster !== "N/A") {
          let movieLink = document.createElement("a");
          movieLink.setAttribute(
            "href",
            `movie.html?t=${encodeURIComponent(movie.Title)}`
          );
          movieLink.classList.add("info");

          let movieDiv = document.createElement("div");
          movieDiv.innerHTML = `
              <div id="details">
                <img src=${movie.Poster} class="poster">
                <h2>${movie.Title}</h2>
                <p>Date de sortie: ${movie.Year}</p>
              </div>`;

          movieLink.appendChild(movieDiv);
          resultContainer.appendChild(movieLink);
        }
      });

      updateButtons();
    } else {
      displayMessage(data.Error);
    }
  };

  let updateButtons = () => {
    previousBtn.disabled = currentPage <= 1;
    nextBtn.disabled =
      currentPage * resultsPerPage >= totalResults || totalResults === 0;
  };

  searchBtn.addEventListener("click", () => {
    currentPage = 1;
    getMovie();
  });

  previousBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      getMovie();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage * resultsPerPage < totalResults) {
      currentPage++;
      getMovie();
    }
  });

  window.addEventListener("load", getMovie);

  movieNameRef.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      currentPage = 1;
      getMovie();
    }
  });
});
