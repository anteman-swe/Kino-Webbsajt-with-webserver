import express from "express";
import ejs from "ejs";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import apiRoutes from "./api-routes.js";
import screeningsRouter from "./upcoming-screenings.js"; 


export default function initServer(api) {
  const server = express();
    // API routes
 server.use("/api", screeningsRouter(api));
  
  const swaggerDocument = YAML.load("./swagger/openapi.yaml");
  const swaggerOptions = {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Kino API dokumentation",
    swaggerOptions: {
      persistAuthorization: true, // Keep auth-token between page loadings
    },
  };

  server.engine("ejs", ejs.renderFile);
  server.set("view engine", "ejs");
  server.set("views", "./views");

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

  // Serving swagger docs
  server.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, swaggerOptions),
  );
  // Serving API
  server.use(apiRoutes(api));

  return server;
}
