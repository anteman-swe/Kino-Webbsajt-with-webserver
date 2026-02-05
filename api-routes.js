import express from  'express';

export default function apiRoutes(api) {
    const router = express.Router();

    router.get("/movies", async (req, res) => {
    const movies = await api.getAllMovies();
    if (!movies.status) {
      res.render("movielist", { pageTitle: "Filmlistan", list: movies.data });
    } else {
      res.status(movies.status).render("errorpage", {
        status: movies.status,
        name: movies.name,
        message: movies.message,
      });
    }
  });

  router.get("/movies/:movieID", async (req, res) => {
    const movieID = req.params.movieID;
    const oneMovie = await api.getOneMovie(movieID);
    if (!oneMovie.status) {
      res.status(200).render("singlemoviepres", {
        pageTitle: oneMovie.title,
        movieId: oneMovie.id,
        movietitle: oneMovie.title,
        movieintro: oneMovie.intro,
        movieimage: oneMovie.poster.url,
      });
    } else {
      res.status(oneMovie.status).render("errorpage", {
        status: oneMovie.status,
        name: oneMovie.name,
        message: oneMovie.message,
      });
    }
  });

  //moment 1 Route
    router.get("/movies/:id/screenings", async (req, res) => {
  try {
    const movieId = Number(req.params.id);
    const screenings = await api.getUpcomingScreeningsSimplified(movieId);
    return res.status(200).json({
       data: screenings.data,
      message: screenings.data.length === 0
    ? "No upcoming screenings within the next 5 days"
    : undefined
  });
  } catch (err) {
    return res.status(500).json({ message: "Failed to load screenings", error: err.message });
  }
});

  router.get("/movies/:movieID/reviews", async (req, res) => {
    const movieID = req.params.movieID;
    const page = parseInt(req.query.page) || 1; // check if request is for other than first page
    const reviewsOneMovie = await api.getAllReviewsForMovie(movieID, page);
    res.status(200).send(reviewsOneMovie).end();
  });

  // Testroute just for fun
  router.get("/coffeemaker", async (req, res) => {
    res.status(418).render("errorpage", {
      status: 418,
      name: "Error!",
      message: "I'm a teapot!",
    });
  });

  return router;
}