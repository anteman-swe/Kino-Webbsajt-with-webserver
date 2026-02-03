import express from "express";
import { getUpcomingScreenings } from "./upcoming-screenings-logic.js";

export async function fetchUpcomingScreenings(api, movieId, now = new Date()) {
  const all = await api.getAllScreenings(); 
  const forMovie = (all || []).filter((s) => s.movie?.id === movieId);
  return getUpcomingScreenings(forMovie, now);
}

export default function apiRouter(api) {
  const router = express.Router();

  router.get("/movies/:id/screenings", async (req, res) => {
    try {
      const movieId = Number(req.params.id);
      const all = await api.getAllScreenings(); 
     const forMovie = (all || []).filter((s) => s.movie?.id === movieId);

     if (req.query.type === "upcoming") {
  const upcoming = await fetchUpcomingScreenings(api, movieId);
  return res.json(upcoming);
}

     return res.json({ movieId, screenings: forMovie }); 
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to load screenings", error: err.message });
    }
  });

  return router;
}

