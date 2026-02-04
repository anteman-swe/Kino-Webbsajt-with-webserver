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
      res.status(200).render("onemovie", {
        pageTitle: oneMovie.title,
        movietitle: oneMovie.title,
        movieintro: oneMovie.intro,
        movieimage: oneMovie.poster.url,
        movieID: movieID,
      });
    } else {
      res.status(oneMovie.status).render("errorpage", {
        status: oneMovie.status,
        name: oneMovie.name,
        message: oneMovie.message,
      });
    }
  });
  

router.get("/movies/:movieID/screenings", async (req, res) => {
  const movieID = req.params.movieID;
  const result = await api.getUpcomingScreeningsForMovie(movieID);

  if (result.status) {
    return res.status(result.status).json({
      status: result.status,
      name: result.name,
      message: result.message,
    });
  }

  return res.status(200).json({ data: result.data });
});

  router.get("/coffeemaker", async (req, res) => {
    res.status(418).render("errorpage", {
      status: 418,
      name: "Error!",
      message: "I'm a teapot!",
    });
  });

  return router;
}