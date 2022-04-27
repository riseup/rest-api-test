const Server = require("../../lib/models/server");
const myServer = new Server();
const { app, paths } = myServer;
const supertest = require("supertest");

describe("/docs", () => {
  describe("get docs route", () => {
    describe("given the user input to the openapi url", () => {
      it("should redirect with 301 to an html", async () => {
        const { statusCode, body, headers } = await supertest(app).get(
          `${paths.docs}`
        );
        expect(statusCode).toBe(301);
        expect(headers["content-type"]).toMatch(/text\/html/);
      });
    });
  });

  describe("get docs.json route", () => {
    describe("given the user input to the docs.json url", () => {
      it("should return a json with 200 ", async () => {
        const { statusCode, body, headers } = await supertest(app).get(
          `${paths.docsJson}`
        );
        expect(statusCode).toBe(200);
        expect(headers["content-type"]).toMatch(/application\/json/);
      });
    });
  });
});
