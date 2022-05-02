const { version } = require("../../package.json");

const getVersion = (req, res, next) => {
  res.status(200).json(version);
};

module.exports = { getVersion };
