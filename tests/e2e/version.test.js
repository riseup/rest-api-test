const supertest = require("supertest");
const Server = require("../../lib/models/server");
const myServer = new Server();
const { app, paths } = myServer;
const { version } = require("../../package.json");

describe("/version", () => {
  describe("get", () => {
    describe("given the call /version", () => {
      it("should return with 200 and a json with version number", async () => {
        const { statusCode, body, headers } = await supertest(app).get(
          `${paths.version}`
        );
        expect(statusCode).toBe(200);
        expect(headers["content-type"]).toMatch(/application\/json/);
        expect(body).toMatch(new RegExp(`${version}`));
      });
    });
  });
});
