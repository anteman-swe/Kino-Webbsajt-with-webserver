import convertMD2HTML from "./mdconversion.js";

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
      return allMovies.data.map(simplifyMovieData);
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
    ...oneMovieData.attributes,
  };
}

// Export of functions as an object
const api = {
  getAllMovies,
  getOneMovie,
};

export default api;
