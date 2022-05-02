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
const mockNotFound = {
  error: {
    message: "ruta_no_existe",
    status: 404
  }
};

describe("/", () => {
  describe("get / route", () => {
    describe("given the user input to the / url", () => {
      it("should return 200 with a json", async () => {
        const { statusCode, body, headers } = await supertest(app).get(
          `${paths.common}`
        );
        expect(statusCode).toBe(200);
        expect(headers["content-type"]).toMatch(/application\/json/);
      });
    });
  });

  describe("get /* route", () => {
    describe("given the user gets to a not found route", () => {
      it("should return a 404 not found CustomError", async () => {
        const { statusCode, body, headers } = await supertest(app).get("/abc");

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
        const result = await supertest(app).get(`/`);

        expect(result.statusCode).toBe(500);
        expect(result.body).toEqual({
          error: {
            message: "Se ha producido un error",
            status: 500
          }
        });
        mySpy.mockRestore();
      });
    });
  });
});
