const docsGet = async (req, res, next) => {
  const { swaggerSpec } = require("../utils/openapi");
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
};

module.exports = { docsGet };
