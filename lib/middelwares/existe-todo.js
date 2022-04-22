const CustomError = require("../models/custom-error");
const db = require("../models/db");

const existeTodo = async (req = request, res = response, next) => {
  const { id } = req.params;
  req.toDo = await db.ToDo.findByPk(id);
  if (!req.toDo) {
    return next(new CustomError("not_found_todo", 404));
  }
  return next();
};

module.exports = { existeTodo };
