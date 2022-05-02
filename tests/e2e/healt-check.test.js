const supertest = require("supertest");
const Server = require("../../lib/models/server");
const myServer = new Server();
const { app, paths } = myServer;

describe("/healthcheck", () => {
  describe("get", () => {
    describe("given the call /healthcheck", () => {
      it("should return a json with 200 with ok", async () => {
        const { statusCode, body, headers } = await supertest(app).get(
          `${paths.healthCheck}`
        );
        expect(statusCode).toBe(200);
        expect(headers["content-type"]).toMatch(/application\/json/);
        console.log(body);
        expect(body).toMatch(/ok/);
      });
    });
  });
});
