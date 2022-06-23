module.exports = {
  getApi() {
    const Server = require("../../../lib/models/server");
    const myServer = new Server();
    const { app, paths } = myServer;
    const supertest = require("supertest");
    const api = supertest(app);
    return { api, paths };
  },
};
