const { getApi } = require("./helpers/server");
const { api, paths } = getApi();

const { version } = require("../../package.json");

describe("/version", () => {
  describe("get", () => {
    describe("given the call /version", () => {
      it("should return with 200 and a json with version number", async () => {
        const { statusCode, body, headers } = await api.get(
          `${paths.version}`
        );
        expect(statusCode).toBe(200);
        expect(headers["content-type"]).toMatch(/application\/json/);
        expect(body).toMatch(new RegExp(`${version}`));
      });
    });
  });
});
