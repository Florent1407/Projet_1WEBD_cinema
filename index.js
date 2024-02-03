document.addEventListener("DOMContentLoaded", () => {
  // Navbar
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    navbar.classList.toggle("scrolled", scrollPosition > 0);
  });

  // Bannière
  const slider = document.getElementById("slider");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  let slideIndex = 0;

  const showSlides = (n) => {
    const slides = document.getElementsByClassName("slide");

    if (n >= slides.length) {
      slideIndex = 0;
    } else if (n < 0) {
      slideIndex = slides.length - 1;
    }

    for (const slide of slides) {
      slide.style.display = "none";
    }

    slides[slideIndex].style.display = "block";
  };

  const nextSlide = () => {
    showSlides((slideIndex += 1));
    setTimeout(nextSlide, 6000);
  };

  leftArrow.addEventListener("click", () => showSlides((slideIndex -= 1)));
  rightArrow.addEventListener("click", () => showSlides((slideIndex += 1)));

  nextSlide();

  // Films
  const apiKey = "5a0c7cf2";
  const baseURL = "https://www.omdbapi.com/";
  let totalMoviesDisplayed = 0;

  const movies = {
    Argylle: { year: 2024, genre: "Action" },
    "Avatar: The Way of Water": { year: 2022, genre: "Science Fiction" },
    Oppenheimer: { year: 2023, genre: "Drama" },
    Aquaman: { year: 2023, genre: "Adventure" },
    "Guardians of the Galaxy": { year: 2023, genre: "Science Fiction" },
    "Gran Turismo": { year: 2023, genre: "Action" },
    KILLERS_OF_THE_FLOWER_MOON: { year: 2023, genre: "Crime" },
    Godzilla_minus_one: { year: null, genre: "Science Fiction" },
    Mars_express: { year: 2023, genre: "Science Fiction" },
    The_Super_Mario_Bros: { year: 2023, genre: "Adventure" },
    Anyone_but_You: { year: 2023, genre: "Romance" },
    May_December: { year: 2023, genre: "Drama" },
    Napoléon: { year: 2023, genre: "Biography" },
    The_Iron_Claw: { year: 2023, genre: "Thriller" },
    Légua: { year: 2023, genre: "Adventure" },
    Wish: { year: 2023, genre: "Fantasy" },
  };

  Object.entries(movies).forEach(([title, details], index) => {
    const url = `${baseURL}?apikey=${apiKey}&t=${encodeURIComponent(title)}&y=${
      details.year
    }`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.Response === "True") {
          const movieData = {
            title: data.Title,
            poster: data.Poster,
            summary: data.Plot,
            genre: details.genre,
          };

          displayMovie(movieData, index);
        } else {
          console.error(`Error "${title}" (${details.year}): Movie not found.`);
        }
      });
  });

  const displayMovie = (movie, index) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie");

    const posterElement = document.createElement("img");
    posterElement.src = movie.poster;
    posterElement.alt = `${movie.title} Poster`;

    const titleElement = document.createElement("h2");
    titleElement.textContent = movie.title;

    const genreElement = document.createElement("p");
    genreElement.textContent = `${movie.genre}`;
    genreElement.classList.add("genre");

    const summaryElement = document.createElement("p");
    summaryElement.textContent = movie.summary;
    summaryElement.classList.add("summary");

    movieContainer.appendChild(posterElement);
    movieContainer.appendChild(titleElement);
    movieContainer.appendChild(genreElement);
    movieContainer.appendChild(summaryElement);

    movieContainer.addEventListener("click", () => {
      window.location.href = `movie.html?t=${encodeURIComponent(movie.title)}`;
    });

    document.getElementById("load-more").addEventListener("click", () => {
      document.getElementById("movies-row-3").style.display = "flex";
      document.getElementById("movies-row-4").style.display = "flex";
      document.getElementById("load-more").style.display = "none";
      document.getElementById("load-less").style.display = "flex";
    });

    document.getElementById("load-less").addEventListener("click", () => {
      document.getElementById("movies-row-3").style.display = "none";
      document.getElementById("movies-row-4").style.display = "none";
      document.getElementById("load-less").style.display = "none";
      document.getElementById("load-more").style.display = "flex";
    });

    const currentRow = Math.floor(index / 4) + 1;
    const newRow = document.getElementById(`movies-row-${currentRow}`);
    newRow.appendChild(movieContainer);

    totalMoviesDisplayed += 1;
  };
});
