const { PORT, APP_URL } = process.env;
const { version } = require("../../package.json");

const paths = {
  todo: "/api/todo",
  docs: "/api/docs",
  docsJson: "/api/docs.json",
  common: "/"
};

module.exports = {
  development: {
    app: {
      version,
      url: APP_URL || `http://localhost:${PORT}`,
      urlDescription: "Servidor de desarrollo",
      paths,
      port: PORT || 8080
    }
  },
  test: {
    app: {
      version,
      url: APP_URL || `http://localhost:${PORT}`,
      urlDescription: "Servidor de test",
      paths,
      port: PORT || 8080
    }
  },
  production: {
    app: {
      version,
      url: APP_URL,
      urlDescription: "Servidor de produccion",
      paths,
      port: PORT
    }
  }
};
