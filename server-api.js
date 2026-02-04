import convertMD2HTML from "./mdconversion.js";

const cms = "https://plankton-app-xhkom.ondigitalocean.app/api"
const movieCollection = "/movies";
const getReviews = "/reviews?filters[movie]=";
const screeningsCollection =
  "https://plankton-app-xhkom.ondigitalocean.app/api/screenings?populate=movie";
const reviewsCollection =
  "https://plankton-app-xhkom.ondigitalocean.app/api/reviews?populate=movie";

const allMovieCollection =
  "https://plankton-app-xhkom.ondigitalocean.app/api/movies";  

async function getAllScreenings() {
  const response = await fetch(screeningsCollection);
  const json = await response.json();
  return json.data; 
}

  //Get reviews
async function getAllReviews() {
  const response = await fetch(reviewsCollection);
  const json = await response.json();

  return json.data.map(item => ({
    id: item.id,
    rating: item.attributes.rating,
    reviewDate: item.attributes.createdAt,
    movieId: item.attributes.movie.data.id
  }));
}

//Get all movies
async function getMovies() {
  const response = await fetch(allMovieCollection);
  const json = await response.json();

  return json.data.map(item => ({
    id: item.id,
    title: item.attributes.title,
    description: item.attributes.intro, // eller description om du har det
    poster: item.attributes.image
  }));
}




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
async function getAllReviewsForMovie(id) { //TODO: need logics for pagination to 5 items per page
  try {
    const response = await fetch(cms + getReviews + id);
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
  simplifyMovieData,
  getAllScreenings,
  getAllReviews,
  getMovies
};

export default api;
