

const encodings = require("./../../node_modules/iconv-lite/encodings");
const iconvLite = require("./../../node_modules/iconv-lite/lib");
iconvLite.getCodec("UTF-8");

const Server = require("../../lib/models/server");
const myServer = new Server();
const { app, paths, server } = myServer;
const supertest = require("supertest");

const db = require("../../lib/models/db");
const { ToDo } = require("../../lib/models/db");

let toDo;
const invalidId = "abc";
const notFoundId = 100000;

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
    date: new Date().toISOString(),
    author: "correo@dominio.com"
  }
];
const mockExpectedErrors = [
  {
    error: {
      message: expect.any(String),
      status: expect.any(Number),
      innerErrors: expect.anything()
    }
  },
  {
    error: { message: "not_found_todo", status: 404 }
  }
];

const todoDAO = require("../../lib/services/todo");
jest.mock("../../lib/services/todo", () => {
  const originalModule = jest.requireActual("../../lib/services/todo");
  return {
    __esModule: true,
    ...originalModule,
    updateToDo: jest.fn(originalModule.updateToDo),
    deleteTodo: jest.fn(originalModule.deleteTodo)
  };
});

afterAll(() => {
  // server.close();
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("todo", () => {
  describe("get todo route", () => {
    describe("given the todo do not exist", () => {
      it("should return 404", async () => {
        const toDoId = 1000;
        await supertest(app).get(`${paths.todo}/${toDoId}`).expect(404);
      });
    });

    describe("given the todos do exist", () => {
      it("should return 200 and the todo", async () => {
        const toDo = await ToDo.create(mockToDoPayloads[1]);
        const { body, statusCode } = await supertest(app).get(
          `${paths.todo}/${toDo.id}`
        );

        expect(statusCode).toBe(200);
        expect(body.toDo.id).toBe(toDo.id);
      });
    });
  });

  describe("post todo route", () => {
    describe("given the todo creation data", () => {
      it("should return 200 and the todo", async () => {
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
        const mymock = todoDAO.updateToDo.mockResolvedValueOnce({
          ...mockToDoPayloads[1],
          id
        });

        const { statusCode, body } = await supertest(app)
          .put(`${paths.todo}/${id}`)
          .send(mockToDoPayloads[1]);

        expect(statusCode).toBe(200);
        expect(body).toEqual({ toDo: { ...mockToDoPayloads[1], id } });
        mymock.mockReset();
      });
    });

    describe("given the id does not match", () => {
      it("should return a 400", async () => {
        // const invalidId = "abc";

        const { statusCode, body } = await supertest(app).put(
          `${paths.todo}/${invalidId}`
        );

        expect(statusCode).toBe(400);
        expect(body).toEqual(mockExpectedErrors[0]);
      });
    });

    describe("given the todo service throws", () => {
      it("should handle the error", async () => {
        const notFound = mockExpectedErrors[1];

        const { statusCode, body } = await supertest(app)
          .put(`${paths.todo}/${notFoundId}`)
          .send(mockToDoPayloads[1]);

        expect(statusCode).toBe(404);
        expect(body).toEqual(notFound);
      });
    });
  });

  describe("delete todo route", () => {
    describe("given the id is valid", () => {
      it("should return the deleted object", async () => {
        toDo = await db.ToDo.create(mockToDoPayloads[0]);
        toDo = toDo.get({ plain: true });
        toDo.date = toDo.date.toISOString();

        const { statusCode, body } = await supertest(app).del(
          `${paths.todo}/${toDo.id}`
        );

        expect(statusCode).toBe(200);
        expect({ toDo: toDo }).toEqual(body);
      });
    });

    describe("given the id does not match", () => {
      it("should return a 400", async () => {
        // const invalidId = "abc";

        const { statusCode, body } = await supertest(app).del(
          `${paths.todo}/${invalidId}`
        );

        expect(statusCode).toBe(400);
        expect(body).toEqual(mockExpectedErrors[0]);
      });
    });

    describe("given the todo service throws", () => {
      it("should handle the error", async () => {
        const notFound = mockExpectedErrors[1];

        const { statusCode, body } = await supertest(app).del(
          `${paths.todo}/${notFoundId}`
        );

        expect(statusCode).toBe(404);
        expect(body).toEqual(notFound);
      });
    });
  });
});
