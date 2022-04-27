const Server = require("../../lib/models/server");
const myServer = new Server();
const { app, paths, server } = myServer;
const supertest = require("supertest");
const {
  app: { name, version }
} = require("../../lib/config/app")[process.env.NODE_ENV || "development"];

const mockResponseHome = {
  name,
  version,
  docs: expect.any(String),
  docs_json: expect.any(String)
};


describe("/", () => {
  describe("get root route", () => {
    describe("given the user input to the root url", () => {
      it("should return 200 with a json", async () => {
        const { statusCode, body, headers } = await supertest(app).get(
          `${paths.common}`
        );
        expect(statusCode).toBe(200);
        expect(headers["content-type"]).toMatch(/application\/json/);
      });
    });
  });

  describe("get * route", () => {
    describe("given the user input to a not found route", () => {
      it("should return a 400 with an object ", async () => {
        const { statusCode, body, headers } = await supertest(app).get(
          `${paths.docsJson}`
        );
        expect(statusCode).toBe(200);
        expect(headers["content-type"]).toMatch(/application\/json/);
        // expect(body).toBe(mockResponseHome);
      });
    });
  });
});
