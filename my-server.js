import express from "express";
import ejs from "ejs";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import kinoRoutes from './routes/routes.js';




export default function initServer(api) {
  const server = express();
  const swaggerDocument = YAML.load('./swagger/openapi.yaml');
  server.engine("ejs", ejs.renderFile);
  server.set("view engine", "ejs");
  server.set("views", './views');

  server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  server.use(kinoRoutes);

  

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
