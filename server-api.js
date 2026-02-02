import convertMD2HTML from "./mdconversion.js";

const screeningsCollection =
  "https://plankton-app-xhkom.ondigitalocean.app/api/screenings?populate=movie";

   function toScreeningDTO(s) {
  const attrs = s?.attributes || {};
  const movieData = attrs?.movie?.data;

  return {
    id: s?.id,
    start_time: attrs?.start_time, 
    room: attrs?.room,
    movie: movieData
      ? {
          id: movieData.id,
          title: movieData.attributes?.title,
          imageUrl: movieData.attributes?.image?.url,
        }
      : null,
  };
}
// Function to get a list of screenings from API

async function getAllScreenings() {
  try {
    const response = await fetch(screeningsCollection);

    if (!response.ok) {
      // försök läsa ett CMS-error, annars fallback
      const errorResponse = await response.json().catch(() => ({}));
      return errorResponse.error || { message: "Failed to fetch screenings" };
    }

    const json = await response.json();
    return (json.data || []).map(toScreeningDTO);
  } catch (err) {
    throw new Error(`Error fetching screenings: ${err.message}`);
  }
}


const movieCollection =
  "https://plankton-app-xhkom.ondigitalocean.app/api/movies";

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

// Export of functions as an object
const api = {
  getAllMovies,
  getOneMovie,
  simplifyMovieData,
  getAllScreenings
};

export default api;
