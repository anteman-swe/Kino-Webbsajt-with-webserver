import { describe, expect, test } from '@jest/globals';
import { getPopularMovies } from "../getPopularMovies.js";
import { mockMovieApi } from './mockPopularMovies.js';


describe("getPopularMovies", () => {
  it("Filters out movies with ratings older than 30 days", async () => {
    const result = await getPopularMovies(mockMovieApi);

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Nytt betyg");
  });

    it("Sorts movies by rating in descending order", async () => {
  const api = {
    getPopularMovies: () => [
      { title: "1", rating: 5, reviewDate: new Date() },
      { title: "2", rating: 9, reviewDate: new Date() },
      { title: "3", rating: 7, reviewDate: new Date() }
    ]
  };

  const result = await getPopularMovies(api);

  expect(result[0].rating).toBe(9); // highest 
  expect(result[1].rating).toBe(7);
  expect(result[2].rating).toBe(5); // lowest
});

  it("Returns the top 5 movies with the highest ratings", async () => {
    const api = {
      getPopularMovies: () => [
        { title: "1", rating: 10, reviewDate: new Date() },
        { title: "2", rating: 9, reviewDate: new Date() },
        { title: "3", rating: 8, reviewDate: new Date() },
        { title: "4", rating: 7, reviewDate: new Date() },
        { title: "5", rating: 6, reviewDate: new Date() },
        { title: "6", rating: 5, reviewDate: new Date() }
      ]
    };
    const result = await getPopularMovies(api);

    expect(result).toHaveLength(5);
    expect(result[0].rating).toBe(10);
    expect(result[4].rating).toBe(6);
  });

   it("Returns an empty list when no movies have ratings within the last 30 days", async () => {
    const api = {
      getPopularMovies: () => [
        { title: "1", rating: 10, reviewDate: new Date(Date.now()-40 * 24 * 60 * 60 * 1000)},
        { title: "2", rating: 9, reviewDate: new Date(Date.now()-40 * 24 * 60 * 60 * 1000)},
        { title: "3", rating: 9, reviewDate: new Date(Date.now()-40 * 24 * 60 * 60 * 1000)},
      ]
    };
    const result = await getPopularMovies(api);

    expect(result).toHaveLength(0);
  });
});