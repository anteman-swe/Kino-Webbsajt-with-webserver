
export const mockMovieApi = {
  
  //Mock API to filter test, one movie with recent rating and one with old rating
  getPopularMovies: async () => [
    { title: "Nytt betyg", rating: 7.1, reviewDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)},
    { title: "Gammalt betyg", rating: 9.3, reviewDate: new Date (Date.now () - 40 * 24 * 60 * 60 * 1000)},
  ]
};
