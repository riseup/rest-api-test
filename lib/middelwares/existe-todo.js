const CustomError = require("../models/custom-error");
const { ToDo } = require("../models/db");

const existeTodo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const todo = await ToDo.findByPk(id);
    if (!todo) {
      return next(new CustomError("not_found_todo", 404));
    }
    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = { existeTodo };
