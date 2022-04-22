const {
  app: { url, paths }
} = require("../config/app")[process.env.NODE_ENV];

const homeGet = async (req, res, next) => {
  try {
    res
      .json({
        name: "API rest test",
        docs: `${url}${paths.docs}`,
        docs_json: `${url}${paths.docsJson}`
      })
      .end();
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
