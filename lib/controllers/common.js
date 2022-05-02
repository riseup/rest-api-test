const CustomError = require("../models/custom-error");
const {
  app: { url, paths, version }
} = require("../config/app")[process.env.NODE_ENV || "development"];

const homeGet = async (req, res, next) => {
  try {
    console.log("")
    return res.json({
      name: "API rest test",
      version,
      docs: `${url}${paths.docs}`,
      docs_json: `${url}${paths.docsJson}`
    });
  } catch (error) {
    next(error);
  }
};

const notFound = async (req, res, next) => {
  next(new CustomError("ruta_no_existe", 404));
};

module.exports = {
  homeGet,
  notFound
};
