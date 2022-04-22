const docsGet = async (req, res, next) => {
  try {
    const { swaggerSpec } = require("../utils/openapi");
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  } catch (error) {
    next(error);
  }
};

module.exports = { docsGet };
