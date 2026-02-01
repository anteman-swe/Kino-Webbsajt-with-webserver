import convertMD2HTML from "./mdconversion.js";

const cms = "https://plankton-app-xhkom.ondigitalocean.app/api"
const movieCollection = "/movies";

// Function to get a list of movies from API
async function getAllMovies() {
  try {
    const response = await fetch(cms + movieCollection);
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
    const response = await fetch(cms + movieCollection + `/${id}`);
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

//Function to get reviews for one movie id
async function getAllReviewsForMovie(id, page) { 
  const getReviewsForMovie = "/reviews?filters[movie]=";
  const pagination = '&pagination[pageSize]=5&pagination[page]=';
  const fetchString = cms + getReviewsForMovie + id + pagination + page;
  try {
    const response = await fetch(fetchString);
    if (!response.ok || response.data == []) {
      const errorResponse = await response.json();
      return errorResponse.error;
    } else {
      const reviews = await response.json();
      return {
        data: reviews.data.map(simplifyReviewData),
        meta: {
          page: reviews.meta.pagination.page,
          pageSize: reviews.meta.pagination.pageSize,
          total: reviews.meta.pagination.total
        }
      }
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

function simplifyReviewData(oneReviewData) {
  return {
    id: oneReviewData.id,
    comment: oneReviewData.attributes.comment,
    rating: oneReviewData.attributes.rating,
    author: oneReviewData.attributes.author,
    verified: oneReviewData.attributes.verified,
    createdAt: oneReviewData.attributes.createdAt,
    updatedAt: oneReviewData.attributes.updatedAt
  }
}

// Export of functions as an object
const api = {
  getAllMovies,
  getOneMovie,
  getAllReviewsForMovie,
  simplifyMovieData
};

export default api;
