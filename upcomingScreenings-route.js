
import express from "express";
import { filterUpcomingScreenings } from "./upcoming-screenings-logic.js";

export default function apiRouter(api) {
  const router = express.Router();

  // Startsidan: kommande visningar för ALLA filmer (max 10 inom 5 dagar)
router.get("/screenings", async (req, res) => {
  try {
    const all = await api.getAllScreenings();

    const wantUpcoming = req.query.type !== "all";
    const screenings = wantUpcoming ? filterUpcomingScreenings(all) : all;

    return res.json({ screenings });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to load screenings", error: err.message });
  }
});

  //Filmsida: visningar för en film, 
  // default: upcoming, ?type=all -> alla
  router.get("/movies/:id/screenings", async (req, res) => {
    try {
      const movieId = Number(req.params.id);

      //  getScreeningsForMovie i server-api.js:
      const forMovie = await api.getScreeningsForMovie(movieId);

      const wantUpcoming = req.query.type !== "all";
      const screenings = wantUpcoming
        ? filterUpcomingScreenings(forMovie)
        : forMovie;

      return res.json({ movieId, screenings });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Failed to load screenings", error: err.message });
    }
  });

  return router;
}
