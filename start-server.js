import initServer from "./my-server.js";
import api from './server-api.js';



server.use("/api/screenings", screeningsRouter(api));

const server = initServer(api);
const port = 5080;

server.listen(port, () => {
    console.log(`Server listening to port: ${port}`)
});