const os = require("os");
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("../utils/openapi");
const { errorHandler } = require("../middelwares");
const CustomError = require("./custom-error");

class Server {
  constructor() {
    this.app = express();
    this.getUrl()
    this.paths = {
      todo: "/api/todo",
      docs: "/api/docs",
      docsJson: "/api/docs.json"
    };
    this.preRequestMiddleware();
    this.commonRoutes()
    this.routes();
    this.postRequestMiddleware();
  }

  getUrl() {
    this.host = os.hostname();
    this.port = process.env.PORT;
    this.proto = process.env.NODE_ENV === "production" ? "https" : "http";
    this.url = `${this.proto}://${this.host}:${this.port}`;
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
    this.app.use(this.paths.todo, require("../routes/todo"));
    this.app.use(this.paths.docsJson, require("../routes/docs"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening at ${this.url}`);
    });
  }

  commonRoutes() {
    this.app.get("/", (req, res) =>
      res
        .json({
          name: "API rest test",
          docs: `${this.url}${this.paths.docs}`,
          docs_json: `${this.url}${this.paths.docsJson}`
        })
        .end()
    );
    this.app.all("/*", (req, res, next) =>
      next(new CustomError("ruta_no_existe", 404))
    );
  }
}

module.exports = Server;
