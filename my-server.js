import express from "express";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import convertMD2HTML from "./mdconversion.js";

export default function initServer(api) {
  const server = express();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // server.engine("ejs", ejs.renderFile);
  server.set("view engine", "ejs");
  server.set("views", path.join(__dirname, "views"));

  server.get("/movies", async (req, res) => {
    const movies = await api.getAllMovies();
    res.send("Movies requested...");
    res.status(200);
    res.end();
  });

  server.get("/movies/:movieID", async (req, res) => {
    const movieID = req.params.movieID;
    const oneMovie = await api.getOneMovie(movieID);
    res.render('onemovie', { 
      movietitle: oneMovie.title,
      movieintro: oneMovie.intro,
      movieimage: oneMovie.image.url
    });
  });

  server.get("/ejstest", async (req, res) => {
    
    console.log('EJS Rendering requested');
    res.render('index', { message: 'Hello world!' });
  });
  server.use("/", express.static("./"));

  return server;
}
