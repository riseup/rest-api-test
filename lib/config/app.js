module.exports = {
  development: {
    app: {
      url: "http://localhost:8080",
      urlDescription: "Servidor de desarrollo",
      paths: {
        todo: "/api/todo",
        docs: "/api/docs",
        docsJson: "/api/docs.json",
        common: "/"
      },
      port: process.env.PORT || 8080
    }
  },
  production: {
    app: {
      url: process.env.APP_URL,
      urlDescription: "Servidor de produccion",
      paths: {
        todo: "/api/todo",
        docs: "/api/docs",
        docsJson: "/api/docs.json",
        common: "/"
      },
      port: process.env.PORT
    }
  }
};
