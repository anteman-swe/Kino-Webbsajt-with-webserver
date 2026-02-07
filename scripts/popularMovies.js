// PopularMovies - Frontend
export async function fetchPopularMovies() {
  const response = await fetch("/api/movies/popular");
  const json = await response.json();
  return json.data;
}

export function renderPopularMovies(movies) {
  const container = document.getElementById("popular_movies_list");

  container.innerHTML = "";

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("popular-movies__card");

    card.innerHTML = `
      <img 
        class="popular-movies__poster" 
        src="${movie.poster.url}" 
        alt="${movie.title}"
      >
      <h3 class="popular-movies__title">${movie.title}</h3>
      <p class="popular-movies__rating">${createStars(movie.averageRating)}</p>
    `;

    container.appendChild(card);
  });
}

function createStars(rating) {
  const fullStar = "⭐";
  // const emptyStar = "☆";

  const stars = fullStar.repeat(rating);
  return `${stars} (${rating})`;
}
