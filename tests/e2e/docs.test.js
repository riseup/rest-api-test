const { getApi } = require("./helpers/server");
const { api, paths } = getApi();

describe("/docs", () => {
  describe("get docs route", () => {
    describe("given the user input to the openapi url", () => {
      it("should redirect with 301 to an html", async () => {
        const { statusCode, body, headers } = await api.get(
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
        const { statusCode, body, headers } = await api.get(
          `${paths.docsJson}`
        );
        expect(statusCode).toBe(200);
        expect(headers["content-type"]).toMatch(/application\/json/);
      });
    });
  });
});
