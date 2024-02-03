const apiKey = "5a0c7cf2";
const baseURL = "https://www.omdbapi.com/";

let movieNameRef = document.getElementById("movie-name");
let resultContainer = document.getElementById("result");
let loadMoreBtn = document.getElementById("load-more");
let searchBtn = document.getElementById("button-search");

let currentPage = 1;
const resultsPerPage = 8;
let totalResults = 0;

let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `${baseURL}?s=${movieName}&page=${currentPage}&apikey=${apiKey}`;

    if (movieName.length <= 0) {
        resultContainer.innerHTML = `<h3 class="msg">Merci d'entrer un nom de film jeune padawan</h3>`;
        loadMoreBtn.style.display = "none";
    } else {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.Response == "True") {
                    totalResults = parseInt(data.totalResults);
                    resultContainer.innerHTML = ""; // Efface le contenu précédent

                    const moviesToDisplay = data.Search.slice(0, resultsPerPage);

                    moviesToDisplay.forEach((movie) => {
                        if (movie.Poster !== "N/A") {
                            let movieDiv = document.createElement("div");
                            movieDiv.classList.add("info");
                            movieDiv.innerHTML = `
                                <div id="details">
                                    <img src=${movie.Poster} class="poster">
                                    <h2>${movie.Title}</h2>
                                    <p>Date de sortie: ${movie.Year}</p>
                                </div>`;
                            resultContainer.appendChild(movieDiv);
                        }
                    });

                    loadMoreBtn.style.display = totalResults > resultsPerPage ? "block" : "none";
                } else {
                    resultContainer.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
                    loadMoreBtn.style.display = "none";
                }
            })
            .catch(() => {
                resultContainer.innerHTML = `<h3 class="msg">Erreur détectée</h3>`;
                loadMoreBtn.style.display = "none";
            });
    }
};

searchBtn.addEventListener("click", getMovie);

window.addEventListener("load", getMovie);

movieNameRef.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        getMovie();
    }
});
