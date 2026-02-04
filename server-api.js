import convertMD2HTML from "./mdconversion.js";

const cms = "https://plankton-app-xhkom.ondigitalocean.app/api";
const movieCollection = "/movies";

const reviewsCollection = cms + "reviews?populate=movie";

const allMovieCollection = cms + movieCollection;  

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




const screeningCollection =
  "https://plankton-app-xhkom.ondigitalocean.app/api/screenings";

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
    intro: oneMovieData.attributes.intro
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
    const payload = await response.json(); 

    if (!response.ok) {
      const err = payload?.error ?? payload;
      return {
        status: err.status ?? response.status,
        name: err.name ?? "Error",
        message: err.message ?? "Unknown error",
      };
    }

    return {
      data: filterAndSortUpcomingScreenings(payload.data),
    };
  } catch (err) {
    return {
      status: 500,
      name: "ServerError",
      message: err.message,
    };
  }
}


// Export of functions as an object
const api = {
  getAllMovies,
  getOneMovie,
  getAllReviewsForMovie,
  getUpcomingScreeningsForMovie,
  simplifyMovieData,
  getAllScreenings,
  getAllReviews,
  getMovies
};

export default api;
