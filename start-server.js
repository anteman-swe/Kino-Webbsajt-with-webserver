import initServer from "./my-server.js";
import api from './server-api.js';
import 'dotenv/config';



server.use("/api/screenings", screeningsRouter(api));

const server = initServer(api);
const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log(`Server listening to port: ${port}`)
});