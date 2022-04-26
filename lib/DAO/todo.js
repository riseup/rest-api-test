const CustomError = require("../models/custom-error");
const { sequelize, ToDo } = require("../models/db");

const updateToDo = async ({ name, description, date, author }, id) => {
  // id = 10000;
  const result = await ToDo.update(
    { name, description, date, author },
    { where: { id }, returning: true }
  );
  if (result[1] == 0) {
    throw new CustomError("update_fail", 400);
  }
  // const toDo = result[1][0].get();
  return await findTodo(id);
};

const findTodo = async (id) => {
  return await ToDo.findByPk(id);
};

module.exports = { updateToDo };
