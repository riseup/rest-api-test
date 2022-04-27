const CustomError = require("../models/custom-error");
const {
  app: { url, paths, version }
} = require("../config/app")[process.env.NODE_ENV || "development"];

const homeGet = async (req, res, next) => {
  res.json({
    name: "API rest test",
    version,
    docs: `${url}${paths.docs}`,
    docs_json: `${url}${paths.docsJson}`
  });
};

const notFound = async (req, res, next) => {
  throw new CustomError("ruta_no_existe", 404);
};

module.exports = {
  homeGet,
  notFound
};
