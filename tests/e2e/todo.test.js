// const { initIconv } = require("./helpers/iconv-lite");
// initIconv();

const { getApi } = require("./helpers/server");
const { api, paths } = getApi();

const db = require("../../lib/models/db");
const { ToDo } = require("../../lib/models/db");

const {
  invalidId,
  notFoundId,
  mockToDoPayloads,
  mockExpectedErrors,
} = require("./helpers/mock-todo");

let toDo;

beforeAll(async () => {
  return db.sequelize.sync({ force: true });
});

afterAll(async () => {
  return db.sequelize.close();
});

describe("/api/todo", () => {
  describe("get todo route with id", () => {
    describe("given the todo do not exist", () => {
      it("should return 404", async () => {
        const toDoId = 1000;
        await api.get(`${paths.todo}/${toDoId}`).expect(404);
      });
    });

    describe("given the todo exist", () => {
      it("should return 200 and the todo", async () => {
        const toDo = await ToDo.create(mockToDoPayloads[1]);
        const { body, statusCode } = await api.get(`${paths.todo}/${toDo.id}`);

        expect(statusCode).toBe(200);
        expect(body.toDo.id).toBe(toDo.id);
        expect(body.toDo.name).toBe(toDo.name);
        expect(body.toDo.description).toBe(toDo.description);
        expect(body.toDo.date).toBe(toDo.date.toISOString());
        expect(body.toDo.author).toBe(toDo.author);
      });
    });

    describe("given findByPk throws", () => {
      it("should return 500", async () => {
        const myFindByPk = jest.spyOn(ToDo, "findByPk");
        myFindByPk.mockResolvedValueOnce({});
        myFindByPk.mockRejectedValueOnce(new Error("findByPk error"));

        const { body, statusCode } = await api.get(
          `${paths.todo}/${notFoundId}`,
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

        const { body, statusCode } = await api.get(
          `${paths.todo}/${notFoundId}`,
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
        const { body, statusCode } = await api.get(
          `${paths.todo}?limit=${limit}&offset=${offset}`,
        );
        expect(statusCode).toBe(200);
        expect(body.toDos.length).toBe(1);
        expect(body.toDos[0].id).toEqual(expect.any(Number));
        expect(body.toDos[0].name).toBe(mockToDoPayloads[1].name);
        expect(body.toDos[0].description).toBe(mockToDoPayloads[1].description);
        expect(body.toDos[0].date).toBe(mockToDoPayloads[1].date);
        expect(body.toDos[0].author).toBe(mockToDoPayloads[1].author);
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
        const { body, statusCode } = await api.get(
          `${paths.todo}/?offset=${offset}&limit=${limit}`,
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
        const { statusCode, body } = await api
          .post(`${paths.todo}/`)
          .send(mockToDoPayloads[0]);

        expect(statusCode).toBe(201);
        expect(body).toEqual({
          toDo: {
            id: expect.any(Number),
            ...mockToDoPayloads[0],
          },
        });
        expect(body.toDo).toHaveProperty("id");
        expect(body.toDo).toHaveProperty("name");
        expect(body.toDo).toHaveProperty("description");
        expect(body.toDo).toHaveProperty("date");
        expect(body.toDo).toHaveProperty("author");
      });
    });

    describe("given create throws", () => {
      it("should return 500", async () => {
        const myFindByPk = jest.spyOn(ToDo, "findByPk");
        myFindByPk.mockResolvedValueOnce({});
        const myCreate = jest.spyOn(ToDo, "create");
        myCreate.mockRejectedValueOnce(new Error("create error"));

        const { statusCode, body } = await api
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
          id,
        };

        const mockUpdate = jest.spyOn(ToDo, "update");
        mockUpdate.mockImplementation(async () => {
          return Promise.resolve({ abc: "abc" });
        });
        const mockFind = jest.spyOn(ToDo, "findByPk");
        mockFind.mockResolvedValue(mockPayload);

        const { statusCode, body } = await api
          .put(`${paths.todo}/${id}`)
          .send(mockToDoPayloads[1]);

        expect(statusCode).toBe(200);
        expect(body).toEqual({ toDo: mockPayload });
        expect(mockUpdate).toHaveBeenCalledWith(
          {
            name: mockToDoPayloads[1].name,
            description: mockToDoPayloads[1].description,
            date: mockToDoPayloads[1].date,
            author: mockToDoPayloads[1].author,
          },
          { where: { id } },
        );
        expect(mockFind).toHaveBeenCalledWith(id);
        mockFind.mockRestore();
        mockUpdate.mockRestore();
        // ToDo.findByPk.mockRestore();
        // ToDo.update.mockRestore();
      });
    });

    describe("given the id does not match", () => {
      it("should return a 400", async () => {
        // const invalidId = "abc";

        const { statusCode, body } = await api.put(
          `${paths.todo}/${invalidId}`,
        );

        expect(statusCode).toBe(400);
        expect(body).toEqual(mockExpectedErrors[0]);
      });
    });

    describe("given the todo service throws", () => {
      it("should handle the error", async () => {
        const notFound = mockExpectedErrors[1];

        const { statusCode, body } = await api
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

        const { statusCode, body } = await api
          .put(`${paths.todo}/${notFoundId}`)
          .send(mockToDoPayloads[1]);

        expect(statusCode).toBe(500);
        expect(body.error.message).toBe("update error");
        expect(myUpdate).toHaveBeenCalledTimes(1);

        myFindByPk.mockRestore();
        myUpdate.mockRestore();
      });
    });

    describe("given update result eq 0", () => {
      it("should return 400", async () => {
        const myFindByPk = jest.spyOn(ToDo, "findByPk");
        myFindByPk.mockResolvedValueOnce({});

        const myUpdate = jest.spyOn(ToDo, "update");
        myUpdate.mockResolvedValueOnce([0]);

        const { statusCode, body } = await api
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

        const { statusCode, body } = await api.del(`${paths.todo}/${toDo.id}`);

        expect(statusCode).toBe(200);
        expect(body).toEqual({ toDo: 1 });
      });
    });

    describe("given the id does not match", () => {
      it("should return a 400", async () => {
        // const invalidId = "abc";

        const { statusCode, body } = await api.del(
          `${paths.todo}/${invalidId}`,
        );

        expect(statusCode).toBe(400);
        expect(body).toEqual(mockExpectedErrors[0]);
      });
    });

    describe("given the todo service throws", () => {
      it("should handle the error", async () => {
        const notFound = mockExpectedErrors[1];

        const { statusCode, body } = await api.del(
          `${paths.todo}/${notFoundId}`,
        );

        expect(statusCode).toBe(404);
        expect(body).toEqual(notFound);
      });
    });

    describe("given update result eq 0", () => {
      it("should return 400", async () => {
        const mockPayload = {
          ...mockToDoPayloads[0],
          id: `${invalidId}`,
        };
        const myFindByPk = jest.spyOn(ToDo, "findByPk");
        myFindByPk.mockResolvedValueOnce(mockPayload);

        const myDestroy = jest.spyOn(ToDo, "destroy");
        myDestroy.mockRejectedValueOnce(new Error("destroy error"));

        const { statusCode, body } = await api.del(
          `${paths.todo}/${notFoundId}`,
        );

        expect(statusCode).toBe(500);
        expect(body.error.message).toBe("destroy error");
        expect(myDestroy).toHaveBeenCalledTimes(1);
        expect(myDestroy).toHaveBeenCalledWith({
          where: { id: `${notFoundId}` },
        });

        myDestroy.mockRestore();
        myFindByPk.mockRestore();
      });
    });
  });
});
