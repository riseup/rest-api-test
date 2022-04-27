const { response, request } = require("express");
const CustomError = require("../models/custom-error");

/**
 *
 * @param {Error} err
 * @param {response} res
 * @param {request} req
 * @param {Function} next
 */
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json(err.toJson);
  }
  const error = new CustomError(err.message);
  return res.status(error.status).json(error.toJson);
};

module.exports = { errorHandler };
