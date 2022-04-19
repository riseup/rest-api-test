const os = require("os");
const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      todo: "/api/todo"
    };
    this.middleware();
    this.routes();
  }

  middleware() {
    // Lectura y parseo del body
    this.app.use(express.json());
    // CORS
    this.app.use(cors());
  }

  routes() {
    this.app.use(this.paths.todo, require("../routes/todo"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening at http://${os.hostname()}:${this.port}`);
    });
  }
}

module.exports = Server;
