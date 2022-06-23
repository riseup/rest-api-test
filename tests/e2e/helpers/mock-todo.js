const invalidId = "abc";
const notFoundId = 100000;
const mockToDoPayloads = [
  {
    name: "Sebato",
    description: "Batus",
    date: "2022-04-22T20:54:21.342Z",
    author: "correo1@dominio.com",
  },
  {
    name: "Test",
    description: "Test",
    date: new Date().toISOString(),
    author: "correo@dominio.com",
  },
];
const mockExpectedErrors = [
  {
    error: {
      message: expect.any(String),
      status: expect.any(Number),
      innerErrors: expect.anything(),
    },
  },
  {
    error: { message: "not_found_todo", status: 404 },
  },
];

module.exports = {
  invalidId,
  notFoundId,
  mockToDoPayloads,
  mockExpectedErrors,
};
