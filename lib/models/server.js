const os = require("os");
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("../utils/openapi");

class Server {
  constructor() {
    this.app = express();
    this.hostname = os.hostname();
    this.port = process.env.PORT;
    this.paths = {
      todo: "/api/todo",
      docs: "/api/docs",
      docsJson: "/api/docs.json"
    };
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(
      this.paths.docs,
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec)
    );
    console.log(
      `Docs available at http://${this.hostname}:${this.port}${this.paths.docs}`
    );

    // Lectura y parseo del body
    this.app.use(express.json());
    // CORS
    this.app.use(cors());
  }

  routes() {
    this.app.use(this.paths.todo, require("../routes/todo"));
    this.app.use(this.paths.docsJson, require("../routes/docs"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening at http://${this.hostname}:${this.port}`);
    });
  }
}

module.exports = Server;
