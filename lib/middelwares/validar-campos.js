const { request, response } = require("express");
const { validationResult } = require("express-validator");
const CustomError = require("../models/custom-error");

const validarCampos = (req = request, res = response, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new CustomError('validation_error', 400)
    err.innerErrors = errors.array()
    throw err;
  }
  next();
};

module.exports = { validarCampos };
