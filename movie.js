const apiKey = "5a0c7cf2";
const baseURL = "https://www.omdbapi.com/";

let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("button-search");
let result = document.getElementById("result");

let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `${baseURL}?apikey=${apiKey}&t=${movieName}`;

    if(movieName.lenght <= 0) {
        result.innerHTML = `<h3 class="msg">Merci d'entrer un nom de film</h3>`;
    }
    else {
        fetch(url).then((response) => response.json()).then((data) => {
            if(data.Response == "True") {
                result.innerHTML = `
                    <div class="info">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img id="star-img" src="img/star.png" class="star">
                                <h4>${data.imdbRating}</h4>
                        </div>
                        <div class="details">
                            <span>${data.Rated}</span>
                            <span>${data.Runtime}</span>
                            <span>${data.Year}</span>
                        </div>
                        <div class="genre">
                            <div>${data.Genre.split(",").join("<div></div>")}</div>
                        </div>
                        <div class="content">
                            <h3>Plot : </h3>
                            <p>${data.Plot}</p>
                            <h3>Distribution : </h3>
                            <p>${data.Actors}</p>
                        </div>
                        <img src=${data.Poster} class="poster">
                    </div>`
            }

            else {
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        }).catch(() => {
            result.innerHTML = `<h3 class="msg">Erreur détecté</h3>`;
        })
    }
}

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);