import express from "express";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

export default function initServer(api) {
  const server = express();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

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
    res.send(`Movie  # ${movieID} requested...Title: ${oneMovie.title}`);
    res.status(200);
    res.end();
  });

  server.use("/", express.static("./"));

  return server;
}
