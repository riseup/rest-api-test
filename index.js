require("dotenv").config();
const Server = require("./lib/models/server");

const myServer = new Server();
myServer.listen().then(console.log).catch(console.error);
