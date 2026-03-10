//Route for popular movies

import express from 'express';
import { fetchPopularMoviesIntegration } from "./popularMovies.js";

export default function apiRoute(api) {
  const router = express.Router();

  router.get("/movies/popular", async (req, res) => {
    try {
  
      const movies = await fetchPopularMoviesIntegration(api);
      res.json({
        data: movies,
        total: movies.length
      });

    } catch (err) {
      res.status(500).json({ message: "Failed to load popular movies!" });
    }
  });

  return router;
}
