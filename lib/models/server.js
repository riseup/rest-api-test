const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("../utils/openapi");
const { errorHandler } = require("../middelwares");
const {
  app: { url, paths, port }
} = require("../config/app")[process.env.NODE_ENV || "development"];

class Server {
  constructor() {
    this.app = express();
    this.port = port;
    this.url = url;
    this.paths = paths;

    this.preRequestMiddleware();
    this.routes();
    this.postRequestMiddleware();
  }

  preRequestMiddleware() {
    this.app.use(
      this.paths.docs,
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec)
    );
    console.log(`Docs available at ${this.url}${this.paths.docs}`);

    // Lectura y parseo del body
    this.app.use(express.json());
    // CORS
    this.app.use(cors());
  }

  postRequestMiddleware() {
    this.app.use(errorHandler);
  }

  routes() {
    this.app.use(this.paths.healthCheck, require("../routes/health-check"));
    this.app.use(this.paths.version, require("../routes/version"));
    this.app.use(this.paths.todo, require("../routes/todo"));
    this.app.use(this.paths.docsJson, require("../routes/docs"));
    this.app.use(this.paths.common, require("../routes/common"));
  }

  async listen() {
    return new Promise((resolve, reject) => {
      this.server = this.app.listen(this.port, () => {
        resolve(`App listening at ${this.url}`);
      });
    });
  }
}

module.exports = Server;
