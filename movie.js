const apiKey = "5a0c7cf2";
const baseURL = "https://www.omdbapi.com/";

let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("button-search");
let result = document.getElementById("result");

let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `${baseURL}?apikey=${apiKey}&t=${movieName}`;
    let url2 = `${baseURL}?apikey=${apiKey}&t=${movieName}&plot=full`;

    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Merci d'entrer un nom de film</h3>`;
    } else {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.Response == "True") {
                    fetch(url2)
                        .then((response2) => response2.json())
                        .then((data2) => {
                            data.Plot = data2.Plot || data.Plot;

                            result.innerHTML = `
                                <div class="info">
                                    <div class="imdbR">
                                        <h2>${data.Title}</h2>
                                        <div class="rating">
                                            <img id="star-img" src="img/star.png" class="star">
                                            <h4>${data.imdbRating}</h4>
                                        </div>
                                    </div>
                                    <div class="grid-container">
                                        <div id="poster-container">
                                            <img id="poster" src="${data.Poster}" class="poster">
                                        </div>
                                        <div id="details-container">
                                            <div id="details">
                                                <div class="details">
                                                    <span>${data.Rated}</span>
                                                    <span>${data.Runtime}</span>
                                                    <span>${data.Year}</span>
                                                    <div>${data.Genre.split(",").join("<div></div>")}</div>
                                                </div>
                                                <div class="content">
                                                    <h3>Plot : </h3>
                                                    <p>${data.Plot}</p>
                                                    <h3>Distribution : </h3>
                                                    <p>${data.Actors}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        })
                        .catch(() => {
                            console.error("Erreur lors de la deuxième requête fetch");
                            result.innerHTML = `<h3 class="msg">Erreur lors de la deuxième requête fetch</h3>`;
                        });
                } else {
                    result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
                }
            })
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Erreur détectée</h3>`;
            });
    }
}

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);