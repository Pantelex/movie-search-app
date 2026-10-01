const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("searchbtn");
const moviesContainer = document.getElementById("movies-container");

// We are using a public test API key.
// If it ever hits limits, you can get your own free key at https://www.omdbapi.com/
const API_KEY = "trilogy";

// Function to fetch movies from the API
async function searchMovies(query) {
  if (!query.trim()) {
    moviesContainer.innerHTML = "<p>Please enter a movie title.</p>"; // Ispravljen zatvoreni p tag
    return;
  }

  try {
    moviesContainer.innerHTML = "<p>Loading...</p>";

    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`,
    );
    const data = await response.json();

    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      moviesContainer.innerHTML = `<p>${data.Error || "No movies found."}</p>`;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    moviesContainer.innerHTML =
      "<p>Something went wrong. Please try again later.</p>";
  }
}

// Function to display movies on the page
function displayMovies(movies) {
  moviesContainer.innerHTML = "";

  movies.forEach((movie) => {
    const posterUrl =
      movie.Poster !== "N/A" ?
        movie.Poster
      : "https://placehold.co/300x450/1e1e1e/ffffff?text=No+Image";

    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
            <img src="${posterUrl}" alt="${movie.Title}">
            <div class="movie-info">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
            </div>
        `;
    moviesContainer.appendChild(movieCard);
  });
}

// Event listener for search button click
searchBtn.addEventListener("click", () => {
  searchMovies(searchInput.value);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchMovies(searchInput.value);
  }
});
