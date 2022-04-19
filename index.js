require("dotenv").config();
const Server = require("./lib/models/server");

const server = new Server();
server.listen();