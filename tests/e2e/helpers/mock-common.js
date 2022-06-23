const {
  app: { name, version },
} = require("../../../lib/config/app")[process.env.NODE_ENV || "development"];

const mockResponseHome = {
  name,
  version,
  docs: expect.any(String),
  docs_json: expect.any(String),
};

const mockNotFound = {
  error: {
    message: "ruta_no_existe",
    status: 404,
  },
};

module.exports = {
  mockResponseHome,
  mockNotFound,
};
