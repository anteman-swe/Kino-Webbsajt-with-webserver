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

  if (oneMovie && !oneMovie.status) {
    res.status(200).render("singlemoviepres", {
      pageTitle: oneMovie.title,
      movieId: oneMovie.id,
      movietitle: oneMovie.title,
      movieintro: oneMovie.intro,
      movieimage: oneMovie.poster?.url,
      
      movieRating: oneMovie.rating?.rating || "N/A",
      ratingSource: oneMovie.rating?.source || "none",
      reviewCount: oneMovie.rating?.count || 0
    });
  } else {
    res.status(404).render("errorpage", { 
      message: "Filmen du försöker nå finns inte i filmlistan",
      pageTitle: "Serverfel!",
      status: "404" 
    });
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
