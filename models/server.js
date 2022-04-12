const express = require("express");
const os = require("os");

class Server {
  constructor() {
    this.app = express();
    this.port = 8080;
    this.paths = {
      todo: "/api/todo"
    };
    this.middleware();
    this.routes();
  }

  middleware() {
    // Lectura y parseo del body
    this.app.use(express.json());
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
