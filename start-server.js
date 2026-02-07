import initServer from "./my-server.js";
import api from "./server-api.js";
import "dotenv/config";

const server = initServer(api);
const port = process.env.PORT || 5080;

server.listen(port, "0.0.0.0", () => {
  console.log(`Server listening to port: ${port}`);
});
