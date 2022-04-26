const { PORT, APP_URL } = process.env;
const { version, name } = require("../../package.json");

const paths = {
  todo: "/api/todo",
  docs: "/api/docs",
  docsJson: "/api/docs.json",
  common: "/"
};

module.exports = {
  development: {
    app: {
      name,
      version,
      url: APP_URL || `http://localhost:8080`,
      urlDescription: "Servidor de desarrollo",
      paths,
      port: PORT || 8080
    }
  },
  test: {
    app: {
      name,
      version,
      url: APP_URL || `http://localhost:8080`,
      urlDescription: "Servidor de test",
      paths,
      port: PORT || 8080
    }
  },
  production: {
    app: {
      name,
      version,
      url: APP_URL,
      urlDescription: "Servidor de producción",
      paths,
      port: PORT
    }
  }
};
