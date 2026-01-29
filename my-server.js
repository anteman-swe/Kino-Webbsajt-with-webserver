import express from "express";
import ejs from "ejs";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import apiRoutes from "./api-routes.js";

import screeningsRouter from "./upcoming-screening.js"; 



export default function initServer(api) {
  const server = express();

  // API routes
  server.use("/api/screenings", screeningsRouter(api));

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  const swaggerDocument = YAML.load("./swagger/openapi.yaml");
  const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Kino API dokumentation",
    swaggerOptions: {
      persistAuthorization: true, // Behåll auth-token mellan sidladdningar
    }
  };

  server.engine("ejs", ejs.renderFile);
  server.set("view engine", "ejs");
  server.set("views", "./views");  

  // Serving swagger docs
  server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
  // Serving API
  server.use(apiRoutes(api));

  // Serving site dynamically
  server.get(["/", "/index", "/index.html"], (req, res) => {
    res.render("index", { pageTitle: "Kino Biograf" });
  });
  server.get(
    ["/member-page", "/memberpage", "/member-page.html"],
    (req, res) => {
      res.render("member-page", { pageTitle: "Medlemssida" });
    },
  );
  server.get(
    ["/breakfast-movie", "/breakfastmovie", "/breakfastmovie.html"],
    (req, res) => {
      res.render("breakfastmovie", { pageTitle: "Frukostbio på Kino" });
    },
  );

  server.get("/movies", async (req, res) => {
    const movies = await api.getAllMovies();
    if (!movies.status){
      res.render("movielist", { pageTitle: "Filmlistan", list: movies });
    } else {
      res.sendStatus(movies.status);
      res.render("errorpage", {
        status: movies.status,
        name: movies.name,
        message: movies.message
      });
    }
  });

  server.get("/movies/:movieID", async (req, res) => {
    const movieID = req.params.movieID;
    const oneMovie = await api.getOneMovie(movieID);
    if (!oneMovie.status) {
      res.render("onemovie", {
        pageTitle: oneMovie.title,
        movietitle: oneMovie.title,
        movieintro: oneMovie.intro,
        movieimage: oneMovie.image.url,
      });
    } else {
      // res.status(movies.status);
      res.status(oneMovie.status).render("errorpage", {
        status: oneMovie.status,
        name: oneMovie.name,
        message: oneMovie.message
      });
    }
  });



  server.get("/templatetest", async (req, res) => {
    const movies = await api.getAllMovies();
    res.status(418).render("movielist", { list: movies });
  });

 


  // Serving main script static
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
