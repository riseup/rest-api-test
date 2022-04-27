const CustomError = require("../models/custom-error");
const { findTodo } = require("../services/todo");

const existeTodo = async (req, res, next) => {
  const { id } = req.params;
  req.toDo = await findTodo(id);
  if (!req.toDo) {
    return next(new CustomError("not_found_todo", 404));
  }
  return next();
};

module.exports = { existeTodo };
