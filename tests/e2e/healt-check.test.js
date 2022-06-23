const { getApi } = require("./helpers/server");
const { api, paths } = getApi();

describe("/healthcheck", () => {
  describe("get", () => {
    describe("given the call /healthcheck", () => {
      it("should return a json with 200 with ok", async () => {
        const { statusCode, body, headers } = await api.get(
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
