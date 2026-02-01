import express from "express";
import { getUpcomingScreenings } from "./upcoming-screenings-logic.js";

export default function apiRouter(api) {
  const router = express.Router();

  router.get("/movies/:id/screenings", async (req, res) => {
    try {
      const movieId = Number(req.params.id);

      const all = await api.getAllScreenings(); 

      const forMovie = (all || []).filter(
        (s) => s?.attributes?.movie?.data?.id === movieId
      );

      if (req.query.type === "upcoming") {
        return res.json(getUpcomingScreenings(forMovie));
      }

      return res.json(forMovie);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to load screenings", error: err.message });
    }
  });

  return router;
}

