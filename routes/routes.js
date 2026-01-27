import express from 'express';
import api from "../server-api.js";

const router = express.Router();

router.get(["/", "/index", "/index.html"], (req, res) => {
    res.render("index", {pageTitle: "Kino Biograf"});
  });

router.get(
    ["/member-page", "/memberpage", "/member-page.html"],
    (req, res) => {
      res.render("member-page", {pageTitle: "Medlemssida"});
    },
  );

router.get(
    ["/breakfast-movie", "/breakfastmovie", "/breakfastmovie.html"],
    (req, res) => {
      res.render("breakfastmovie", {pageTitle: "Frukostbio på Kino"});
    },
  );

router.get("/movies", async (req, res) => {
    const movies = await api.getAllMovies();
    if (!movies.status){
      res.render("movielist", { pageTitle: "Filmlistan", list: movies });
    } else {
      res.status(movies.status).render("errorpage", {
        status: movies.status,
        name: movies.name,
        message: movies.message
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
        movieimage: oneMovie.image.url,
      });
    } else {
      res.status(oneMovie.status).render("errorpage", {
        status: oneMovie.status,
        name: oneMovie.name,
        message: oneMovie.message
      });
    }
  });

router.get("/coffeemaker", async (req, res) => {
    res.status(418).render("errorpage", {
        status: 418,
        name: "Error!",
        message: "I'm a teapot!"
      });
  });

  export default router;