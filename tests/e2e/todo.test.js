const supertest = require("supertest");
require("dotenv").config();

const Server = require("../../lib/models/server");
const server = new Server();
const { app, paths } = server;

describe("todo", () => {
  describe("get todos route", () => {
    describe("given the todos does not exist", () => {
      test("should return 404", async () => {
        const toDoId = 1000;
        await supertest(app).get(`${paths.todo}/${toDoId}`).expect(404);
      });
    });
  });
});
