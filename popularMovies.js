export async function fetchPopularMovies(api) {
  const movies = await api.getPopularMovies();

  //Filter out movies older then 30 days
  const THIRTY_DAYS_IN = 30 * 24 * 60 * 60 * 1000;
  const now = Date.now();

  const recentMovies = movies.filter (movie => {
    const reviewTime = new Date (movie.reviewDate).getTime();
    return now - reviewTime<= THIRTY_DAYS_IN;
  });

  //Sort movies by rating and returns the top 5
  return recentMovies
  .sort((a, b) => b.rating - a.rating) .slice(0, 5);
}
