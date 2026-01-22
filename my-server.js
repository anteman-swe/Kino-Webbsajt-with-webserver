import express from "express";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

export default function initServer(api) {
  const server = express();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  server.engine("ejs", ejs.renderFile);
  server.set("view engine", "ejs");
  server.set("views", path.join(__dirname, "views"));

  server.get(["/", "/index", "/index.html"], (req, res) => {
    res.render("index");
  });

  server.get(
    ["/member-page", "/memberpage", "/member-page.html"],
    (req, res) => {
      res.render("member-page");
    },
  );

  server.get(
    ["/breakfast-movie", "/breakfastmovie", "/breakfastmovie.html"],
    (req, res) => {
      res.render("breakfastmovie");
    },
  );

  server.get("/movies", async (req, res) => {
    const movies = await api.getAllMovies();
    res.render("movielist", { list: movies });
  });

  server.get("/movies/:movieID", async (req, res) => {
    const movieID = req.params.movieID;
    const oneMovie = await api.getOneMovie(movieID);
    res.render("onemovie", {
      movietitle: oneMovie.title,
      movieintro: oneMovie.intro,
      movieimage: oneMovie.image.url,
    });
  });
  // Serving script static
  server.use("/src", express.static("./src"));
  // Serving sub-scripts static
  server.use("/scripts", express.static("./scripts"));
  // Serving mock-data static
  server.use("/mockup_Data", express.static("./mockup_Data"));
  // Serving css static
  server.use("/css", express.static("./css"));
  // Serving asset static
  server.use("/assets", express.static("./assets"));

  return server;
}
