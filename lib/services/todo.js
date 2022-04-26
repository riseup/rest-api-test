const CustomError = require("../models/custom-error");
const { ToDo } = require("../models/db");
const db = require("../models/db");

const createToDo = async ({ name, description, date, author }) => {
  return await db.ToDo.create({ name, description, date, author });
};

const updateToDo = async ({ name, description, date, author }, id) => {
  try {
    const result = await ToDo.update(
      { name, description, date, author },
      { where: { id }, returning: true }
    );
    if (result[1] === 0) throw new CustomError("update_fail", 400);
    return await findTodo(id);
  } catch (error) {
    throw error;
  }
};

const findTodo = async (id, instance = null) => {
  try {
    if (!instance) return await ToDo.findByPk(id);
    return instance;
  } catch (error) {
    throw error;
  }
};

const allToDos = async () => {
  try {
    const [toDos, total] = await Promise.all([
      db.ToDo.findAll(),
      db.ToDo.count()
    ]);
    return [toDos, total];
  } catch (error) {
    throw error;
  }
};

const deleteTodo = async (id, instance = null) => {
  try {
    if (!instance) instance = findTodo(id);
    const deleted = await instance.destroy({ force: true });
    return deleted;
  } catch (error) {
    throw error;
  }
};

module.exports = { createToDo, findTodo, updateToDo, deleteTodo, allToDos };
