require("dotenv").config();

const encodings = require("./../../node_modules/iconv-lite/encodings");
const iconvLite = require("./../../node_modules/iconv-lite/lib");
iconvLite.getCodec("UTF-8");

const { myServer } = require("../../index");
const { app, paths, server } = myServer;
const supertest = require("supertest");

const { ToDo } = require("../../lib/models/db");
let toDo;
const mockToDoPayloads = [
  {
    name: "Sebato",
    description: "Batus",
    date: "2022-04-22T20:54:21.342Z",
    author: "correo1@dominio.com"
  },
  {
    name: "Test",
    description: "Test",
    date: new Date(),
    author: "correo@dominio.com"
  }
];

const todoDAO = require("../../lib/DAO/todo");
jest.mock("../../lib/DAO/todo", () => {
  const originalModule = jest.requireActual("../../lib/DAO/todo");
  return {
    __esModule: true,
    ...originalModule,
    updateToDo: jest.fn(() => ({
      id: 1,
      ...mockToDoPayloads[0]
    }))
  };
});

describe("todo", () => {
  describe("get todo route", () => {
    describe("given the todos do not exist", () => {
      it("should return 404", async () => {
        const toDoId = 1000;
        await supertest(app).get(`${paths.todo}/${toDoId}`).expect(404);
      });
    });
    describe("given the todos do exist", () => {
      it("should return 200 and the todo", async () => {
        const toDoObject = {
          name: "Test",
          description: "Test",
          date: new Date(),
          author: "correo@dominio.com"
        };
        const toDo = await ToDo.create(toDoObject);
        const { body, statusCode } = await supertest(app).get(
          `${paths.todo}/${toDo.id}`
        );
        // console.log(body);
        expect(statusCode).toBe(200);
        expect(body.toDo.id).toBe(toDo.id);
      });
    });
  });
  describe("post todo route", () => {
    describe("given the todo creation data", () => {
      test("should return 200 and the todo", async () => {
        const { statusCode, body } = await supertest(app)
          .post(`${paths.todo}/`)
          .send(mockToDoPayloads[0]);

        expect(statusCode).toBe(201);
        expect(body).toEqual({
          toDo: {
            id: expect.any(Number),
            ...mockToDoPayloads[0]
          }
        });
        expect(body.toDo).toHaveProperty("id");
      });
    });
  });
  describe("put todo route", () => {
    describe("given the id is valid", () => {
      it("should return a todo", async () => {
        const id = 1;
        const toDoWithId = { ...mockToDoPayloads[1], id };
        const { statusCode, body } = await supertest(app)
          .put(`${paths.todo}/${id}`)
          .send(mockToDoPayloads[1]);
        expect(statusCode).toBe(200);
        // console.log(body, statusCode);
      });
    });

    describe.skip("given the id does not match", () => {
      it("should return a 400", async () => {});
    });
    describe.skip("given the todo service throws", () => {
      it("should handle the error", async () => {});
    });
  });
  describe("delete todo route", () => {});
});

afterAll(() => {
  server.close();
});
