const { logging } = require("../../../lib/config/db");

const mockObject = { test: "hello mock" };

describe("app.js", () => {
  describe("test app config", () => {
    describe("given sequelize logs an sql query", () => {
      it("should logs properly", async () => {
        const logSpy = jest
          .spyOn(global.console, "log")
          .mockReturnValueOnce(mockObject);
        logging(mockObject);
        expect(logSpy).toHaveBeenCalledWith([mockObject]);
        logSpy.mockRestore();
      });
    });
  });
});
