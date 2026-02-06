import convertMD2HTML from "./mdconversion.js";


const cms = "https://plankton-app-xhkom.ondigitalocean.app/api";

const movieCollection = cms + "/movies";
const screeningsCollection = cms + "/screenings";
const reviewsCollection = cms + "/reviews?populate=movie";
//Moment 1

//Simplify function
 import { getUpcomingScreenings } from "./upcoming-screenings-logic.js";
async function getUpcomingScreeningsSimplified(movieId) {
  const url = new URL(screeningsCollection);
  url.searchParams.set("populate", "movie");
  url.searchParams.set("filters[movie]", movieId);

  const response = await fetch(url.toString());
  const payload = await response.json();

  const simplified = (payload.data || []).map((s) => ({
    id: s.id,
    start_time: s.attributes?.start_time,
    room: s.attributes?.room ?? null,
  }));

  return { data: getUpcomingScreenings(simplified) };
}

//Moment 1
  // Get all movies (screenings) from CMS
async function getAllScreenings() {
 try {
    const url = new URL(screeningsCollection);
    url.searchParams.set("populate", "movie"); //
    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorResponse = await response.json().catch(() => ({}));
      return errorResponse.error || { message: "Failed to fetch screenings" };
    }

    const json = await response.json();

    return (json.data || []).map((s) => {
      const attrs = s.attributes || {};
      const movieData = attrs.movie?.data;

      return {
        id: s.id,
        start_time: attrs.start_time,
        room: attrs.room,
        movie: movieData
          ? {
              id: movieData.id,
              title: movieData.attributes?.title,
              imageUrl: movieData.attributes?.image?.url,
            }
          : null,
      };
    });
  } catch (err) {
    throw new Error(`Error fetching screenings: ${err.message}`);
  }
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
  const response = await fetch(movieCollection);
  const json = await response.json();

  return json.data.map(item => ({
    id: item.id,
    title: item.attributes.title,
    description: item.attributes.intro,
    poster: item.attributes.image
  }));
}

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
          total: allMovies.meta.pagination.total,
        },
      };
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
      const movieData = simplifyMovieData(oneMovie.data);
      const ratingInfo = await getMovieScore(movieData.imdbId);

      movieData.rating = ratingInfo;
      
      return movieData;
      
    }
  } catch (err) {
    throw new Error(`Error message: ${err.message}`);
  }
}

//Function to get reviews for one movie id
async function getAllReviewsForMovie(id, page, reqPageSize = 5) {
  const fetchString = cms + "/reviews?filters[movie]=" + id + "&pagination[page]=" + page + "&pagination[pageSize]=" + reqPageSize;
  try {
    const response = await fetch(fetchString);
    if (!response.ok || response.data == []) {
      const errorResponse = await response.json();
      return errorResponse.error;
    } else {
      const reviews = await response.json();
      const rev = reviews.data.map(simplifyReviewData);
      return {
        data: rev,
        meta: {
          page: page,
          pageSize: reqPageSize,
          total: reviews.meta.pagination.total,
        },
      };
    } 
  } catch (err) {
    throw new Error(`Error message: ${err.message}`);
  }
}

// Function to clean and simplify an object with data about a movie
function simplifyMovieData(oneMovieData) {
  const convertedIntro = convertMD2HTML(oneMovieData.attributes.intro);
  oneMovieData.attributes.intro = convertedIntro;

  return {
    id: oneMovieData.id,
    title: oneMovieData.attributes.title,
    poster: oneMovieData.attributes.image,
    intro: oneMovieData.attributes.intro,
    imdbId: oneMovieData.attributes.imdbId,
  };
}

// Function to clean and simplify an object with a movie review
function simplifyReviewData(oneReviewData) {
  return {
    id: oneReviewData.id,
    comment: oneReviewData.attributes.comment,
    rating: oneReviewData.attributes.rating,
    author: oneReviewData.attributes.author,
    verified: oneReviewData.attributes.verified,
    createdAt: oneReviewData.attributes.createdAt,
    updatedAt: oneReviewData.attributes.updatedAt
  };
}

export async function getMovieScore(targetImdbId) {
  // Simple filter for the movie only. No verified filter.
  const reviewsUrl = `${cms}/reviews?filters[movie][imdbId]=${targetImdbId}&pagination[limit]=100`;
  const externalApiUrl = `https://api.imdbapi.dev/titles/${targetImdbId}`;

  try {
    const response = await fetch(reviewsUrl);
    const json = await response.json();
    const movieReviews = json.data || [];

    if (movieReviews.length >= 5) {
      const totalScore = movieReviews.reduce((sum, r) => sum + Number(r.attributes.rating), 0);
      const average = (totalScore / movieReviews.length).toFixed(1);
      
      return { 
        source: 'local', 
        rating: average, 
        count: movieReviews.length 
      };
    } else {
      const externalRes = await fetch(externalApiUrl);
      const externalData = await externalRes.json();
      return { 
        source: 'imdb', 
        rating: externalData.rating?.aggregateRating || "N/A",
        count: movieReviews.length 
      };
    }
  } catch (error) {
    return { source: 'none', rating: "N/A", count: 0 }; 
  }
}
  



// Export of functions as an object
const api = {
  getAllMovies,
  getOneMovie,
  getAllReviewsForMovie,
  simplifyMovieData,
  getAllScreenings,
  getAllReviews,
  getMovies,
  getMovieScore,
  getUpcomingScreeningsSimplified,
};

export default api;
