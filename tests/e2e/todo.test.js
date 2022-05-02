const encodings = require("./../../node_modules/iconv-lite/encodings");
const iconvLite = require("./../../node_modules/iconv-lite/lib");
iconvLite.getCodec("UTF-8");

const Server = require("../../lib/models/server");
const myServer = new Server();
const { app, paths } = myServer;
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

beforeAll(async () => {
  await myServer.listen();
  return db.sequelize.sync({ force: true });
});

afterAll(async () => {
  myServer.server.close();
  return db.sequelize.close();
});

describe("/api/todo", () => {
  describe("get todo route with id", () => {
    describe("given the todo do not exist", () => {
      it("should return 404", async () => {
        const toDoId = 1000;
        await supertest(app).get(`${paths.todo}/${toDoId}`).expect(404);
      });
    });

    describe("given the todo exist", () => {
      it("should return 200 and the todo", async () => {
        const toDo = await ToDo.create(mockToDoPayloads[1]);
        const { body, statusCode } = await supertest(app).get(
          `${paths.todo}/${toDo.id}`
        );

        expect(statusCode).toBe(200);
        expect(body.toDo.id).toBe(toDo.id);
      });
    });

    describe("given findByPk throws", () => {
      it("should return 500", async () => {
        const myFindByPk = jest.spyOn(ToDo, "findByPk");
        myFindByPk.mockResolvedValueOnce({});
        myFindByPk.mockRejectedValueOnce(new Error("findByPk error"));

        const { body, statusCode } = await supertest(app).get(
          `${paths.todo}/${notFoundId}`
        );
        expect(statusCode).toBe(500);
        expect(body.error.message).toBe("findByPk error");
        expect(myFindByPk).toHaveBeenCalledTimes(2);

        myFindByPk.mockRestore();
      });
    });
    describe("given findByPk throws in middleware", () => {
      it("should return 500", async () => {
        const myFindByPk = jest.spyOn(ToDo, "findByPk");
        myFindByPk.mockRejectedValueOnce(new Error("findByPk error"));

        const { body, statusCode } = await supertest(app).get(
          `${paths.todo}/${notFoundId}`
        );
        expect(statusCode).toBe(500);
        expect(body.error.message).toBe("findByPk error");
        expect(myFindByPk).toHaveBeenCalledTimes(1);

        myFindByPk.mockRestore();
      });
    });
  });

  describe("get todo route without id", () => {
    describe("given the limit, and offset", () => {
      it("should return 200 and the todo", async () => {
        const limit = 1;
        const offset = 0;
        const { body, statusCode } = await supertest(app).get(
          `${paths.todo}?limit=${limit}&offset=${offset}`
        );
        expect(statusCode).toBe(200);
        expect(body.toDos.length).toBe(1);
      });
    });
    describe("given findAndCountAll throws", () => {
      it("should return 500", async () => {
        const offset = 1;
        const limit = 2;
        const myFindAndCountAll = jest.spyOn(ToDo, "findAndCountAll");
        myFindAndCountAll.mockImplementation(async () => {
          return Promise.reject(new Error("findAndCountAll error"));
        });
        const { body, statusCode } = await supertest(app).get(
          `${paths.todo}/?offset=${offset}&limit=${limit}`
        );
        expect(statusCode).toBe(500);
        expect(body.error.message).toBe("findAndCountAll error");
        expect(myFindAndCountAll).toHaveBeenCalledTimes(1);

        myFindAndCountAll.mockRestore();
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

    describe("given create throws", () => {
      it("should return 500", async () => {
        const myFindByPk = jest.spyOn(ToDo, "findByPk");
        myFindByPk.mockResolvedValueOnce({});
        const myCreate = jest.spyOn(ToDo, "create");
        myCreate.mockRejectedValueOnce(new Error("create error"));

        const { statusCode, body } = await supertest(app)
          .post(`${paths.todo}/`)
          .send(mockToDoPayloads[0]);

        expect(statusCode).toBe(500);
        expect(body.error.message).toBe("create error");
        expect(myCreate).toHaveBeenCalledTimes(1);

        myCreate.mockRestore();
        myFindByPk.mockRestore();
      });
    });
  });

  describe("put todo route", () => {
    describe("given the id is valid", () => {
      it("should return a todo asdf", async () => {
        const id = "1";
        mockPayload = {
          ...mockToDoPayloads[0],
          id
        };

        const mockUpdate = jest.spyOn(ToDo, "update");
        mockUpdate.mockImplementation(async () => {
          return Promise.resolve({ abc: "abc" });
        });
        const mockFind = jest.spyOn(ToDo, "findByPk");
        mockFind.mockResolvedValue(mockPayload);

        const { statusCode, body } = await supertest(app)
          .put(`${paths.todo}/${id}`)
          .send(mockToDoPayloads[1]);

        expect(statusCode).toBe(200);
        expect(body).toEqual({ toDo: mockPayload });
        expect(mockUpdate).toHaveBeenCalledWith(
          {
            name: mockToDoPayloads[1].name,
            description: mockToDoPayloads[1].description,
            date: mockToDoPayloads[1].date,
            author: mockToDoPayloads[1].author
          },
          { where: { id } }
        );
        expect(mockFind).toHaveBeenCalledWith(id);
        ToDo.findByPk.mockRestore();
        ToDo.update.mockRestore();
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

    describe("given update throws", () => {
      it("should return 500", async () => {
        const myFindByPk = jest.spyOn(ToDo, "findByPk");
        myFindByPk.mockResolvedValueOnce({});

        const myUpdate = jest.spyOn(ToDo, "update");
        myUpdate.mockRejectedValueOnce(new Error("update error"));

        const { statusCode, body } = await supertest(app)
          .put(`${paths.todo}/${notFoundId}`)
          .send(mockToDoPayloads[1]);

        expect(statusCode).toBe(500);
        expect(body.error.message).toBe("update error");
        expect(myUpdate).toHaveBeenCalledTimes(1);

        myUpdate.mockRestore();
      });
    });

    describe("given update result eq 0", () => {
      it("should return 400", async () => {
        const myFindByPk = jest.spyOn(ToDo, "findByPk");
        myFindByPk.mockResolvedValueOnce({});

        const myUpdate = jest.spyOn(ToDo, "update");
        myUpdate.mockResolvedValueOnce([0]);

        const { statusCode, body } = await supertest(app)
          .put(`${paths.todo}/${notFoundId}`)
          .send(mockToDoPayloads[1]);

        expect(statusCode).toBe(400);
        expect(body.error.message).toBe("error_update");
        expect(myUpdate).toHaveBeenCalledTimes(1);

        myUpdate.mockRestore();
        myFindByPk.mockRestore();
      });
    });
  });

  describe("delete todo route", () => {
    describe("given the id is valid", () => {
      it("should return the deleted object", async () => {
        toDo = await ToDo.create(mockToDoPayloads[0]);
        toDo = toDo.get({ plain: true });
        toDo.date = toDo.date.toISOString();

        const { statusCode, body } = await supertest(app).del(
          `${paths.todo}/${toDo.id}`
        );

        expect(statusCode).toBe(200);
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

    describe("given update result eq 0", () => {
      it("should return 400", async () => {
        const mockPayload = {
          ...mockToDoPayloads[0],
          id: `${invalidId}`
        };
        const myFindByPk = jest.spyOn(ToDo, "findByPk");
        myFindByPk.mockResolvedValueOnce(mockPayload);

        const myDestroy = jest.spyOn(ToDo, "destroy");
        myDestroy.mockRejectedValueOnce(new Error("destroy error"));

        const { statusCode, body } = await supertest(app).del(
          `${paths.todo}/${notFoundId}`
        );

        expect(statusCode).toBe(500);
        expect(body.error.message).toBe("destroy error");
        expect(myDestroy).toHaveBeenCalledTimes(1);
        expect(myDestroy).toHaveBeenCalledWith({
          where: { id: `${notFoundId}` }
        });

        myDestroy.mockRestore();
        myFindByPk.mockRestore();
      });
    });
  });
});
