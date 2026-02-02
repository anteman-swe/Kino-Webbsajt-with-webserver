import convertMD2HTML from "./mdconversion.js";

const movieCollection =
  "https://plankton-app-xhkom.ondigitalocean.app/api/movies";

const screeningCollection =
  "https://plankton-app-xhkom.ondigitalocean.app/api/screenings";

// Function to get a list of movies from API
async function getAllMovies() {
  try {
    const response = await fetch(movieCollection);
    if (!response.ok) {
      const errorResponse = await response.json();
      return errorResponse.error;
    } else {
      const allMovies = await response.json();
      return {
        data: allMovies.data.map(simplifyMovieData),
        meta: {
          page: allMovies.meta.pagination.page,
          pageSize: allMovies.meta.pagination.pageSize,
          total: allMovies.meta.pagination.total
        }
      }
    }
  } catch (err) {
    throw new Error(`Error message: ${err.message}`);
  }
}

// Function to get one specific movie from API
async function getOneMovie(id) {
  try {
    const response = await fetch(movieCollection + `/${id}`);
    if (!response.ok) {
      const errorResponse = await response.json();
      return errorResponse.error;
    } else {
      const oneMovie = await response.json();
      return simplifyMovieData(oneMovie.data);
    }
  } catch (err) {
    throw new Error(`Error message: ${err.message}`);
  }
}

// Function to clean and simplify a json-object with data about a movie
function simplifyMovieData(oneMovieData) {
  const convertedIntro = convertMD2HTML(oneMovieData.attributes.intro);
  oneMovieData.attributes.intro = convertedIntro;
  
  return {
    id: oneMovieData.id,
    title: oneMovieData.attributes.title,
    poster: oneMovieData.attributes.image,
    intro: oneMovieData.attributes.intro
  };
}
// Function to filter and sort upcoming screenings
export function filterAndSortUpcomingScreenings(screeningsData, now = new Date()) {
  return screeningsData
    .filter((s) => {
      const start = new Date(s.attributes.start_time);
      return start > now;
    })
    .sort((a, b) => {
      const da = new Date(a.attributes.start_time).getTime();
      const db = new Date(b.attributes.start_time).getTime();
      return da - db;
    })
    .map(simplifyScreeningData);
}

// Function to clean and simplify a json-object with data about a screening
function simplifyScreeningData(oneScreening) {
  return {
    id: oneScreening.id,
    start_time: oneScreening.attributes.start_time,
    room: oneScreening.attributes.room ?? null
  };
}

async function getUpcomingScreeningsForMovie(movieId) {
  try {
    const url = new URL(screeningCollection);
    url.searchParams.set("populate", "movie");
    url.searchParams.set("filters[movie]", movieId);

    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorResponse = await response.json();
      return errorResponse.error;
    }

    const payload = await response.json();

    return {
      data: filterAndSortUpcomingScreenings(payload.data),
    };
  } catch (err) {
    throw new Error(`Error message: ${err.message}`);
  }
}


// Export of functions as an object
const api = {
  getAllMovies,
  getOneMovie,
  getUpcomingScreeningsForMovie,
  simplifyMovieData
};

export default api;
