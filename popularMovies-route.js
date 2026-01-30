//inuti popularMovie-routes.js
import express from  'express';
import { getPopularMovies } from "./popularMovies.js";

//Popular movies route
export default function popularMoviesRoute(api){
  const router= express.Router();

  router.get("/popular-movies",async (reg, res)=> {
    
  try {
      const cmsData = await api.getCMSData();
      const popularMovies = await api.getPopularMovies(cmsData);

      if (req.query.type === "popular") {
        return res.json(getPopularMovies(popularMovies));
      }

      return res.json(popularMovies);
    } catch (err) {
      return res.status(500).json({ message: "Failed to load screenings" });
    }
  });

  return router;
}