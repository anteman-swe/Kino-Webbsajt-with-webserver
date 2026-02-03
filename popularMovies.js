//Funktion for 
export async function fetchPopularMoviesIntegration(api) {

  //Get reviews and movies
  const reviews = await api.getReviews();
  const movies = await api.getMovies();

  //FIlter out reviews older than 30 days
  const now = Date.now();
  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

  const recentReviews = reviews.filter(review => {
    const reviewTime = new Date(review.reviewDate).getTime();
    return now - reviewTime <= THIRTY_DAYS;
  });

  const reviewsByMovie = {};
  for (const review of recentReviews) {
    if (!reviewsByMovie[review.movieId]) {
      reviewsByMovie[review.movieId] = [];
    }
    reviewsByMovie[review.movieId].push(review);
  }

  const moviesWithRatings = movies
    .map(movie => {
      const movieReviews = reviewsByMovie[movie.id];
      if (!movieReviews || movieReviews.length === 0) return null;

      const total = movieReviews.reduce((sum, r) => sum + r.rating, 0);
      const averageRating = total / movieReviews.length;

      return {
        ...movie,
        averageRating
      };
    })
    .filter(Boolean); 

  // Sort and return top 5 movies
  return moviesWithRatings
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 5);
}


  //Funtion for unit tests, TDD
  //Using a mockup list with movies från test API
  export async function fetchPopularMovies(api) {
    const movies = await api.getPopularMovies();

    //Filter out movies older then 30 days
    const THIRTY_DAYS_IN = 30 * 24 * 60 * 60 * 1000;
    const now = Date.now();

    const recentMovies = movies.filter(movie => {
      const reviewTime = new Date(movie.reviewDate).getTime();
      return now - reviewTime <= THIRTY_DAYS_IN;
    });

    //Sort movies by rating and returns the top 5
    return recentMovies
      .sort((a, b) => b.rating - a.rating).slice(0, 5);
  }
