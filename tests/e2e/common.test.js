const { getApi } = require("./helpers/server");
const { api, paths } = getApi();

const { mockResponseHome, mockNotFound } = require("./helpers/mock-common");

describe("/", () => {
  describe("get / route", () => {
    describe("given the user input to the / url", () => {
      it("should return 200 with a json", async () => {
        const { statusCode, body, headers } = await api.get(`${paths.common}`);
        expect(statusCode).toBe(200);
        expect(headers["content-type"]).toMatch(/application\/json/);
      });
    });
  });

  describe("get /* route", () => {
    describe("given the user gets to a not found route", () => {
      it("should return a 404 not found CustomError", async () => {
        const { statusCode, body, headers } = await api.get("/abc");

        expect(statusCode).toBe(404);
        expect(headers["content-type"]).toMatch(/application\/json/);
        expect(body).toEqual(mockNotFound);
      });
    });

    describe("given the user gets / and this trows", () => {
      it("should pass to error middleware and return a CustomError", async () => {
        const mySpy = jest.spyOn(console, "log").mockImplementationOnce(() => {
          throw new Error("Se ha producido un error");
        });
        const result = await api.get(`/`);

        expect(result.statusCode).toBe(500);
        expect(result.body).toEqual({
          error: {
            message: "Se ha producido un error",
            status: 500,
          },
        });
        mySpy.mockRestore();
      });
    });
  });
});
