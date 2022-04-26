const { request, response } = require("express");
const {
  updateToDo,
  deleteTodo,
  allToDos,
  findTodo,
  createToDo
} = require("../services/todo");

const todoGetById = async (req = request, res = response, next) => {
  try {
    const {
      toDo: instance,
      params: { id }
    } = req;
    const toDo = await findTodo(id, instance);
    res.json({ toDo });
  } catch (error) {
    next(error);
  }
};

const todoGet = async (req = request, res = response, next) => {
  try {
    const [toDos, total] = await allToDos();
    return res.json({ total, toDos });
  } catch (error) {
    next(error);
  }
};

const todoPost = async (req = request, res = response, next) => {
  try {
    const {
      body: { name, description, date, author }
    } = req;
    const toDo = await createToDo({ name, description, date, author });
    res.status(201).json({ toDo });
  } catch (error) {
    next(error);
  }
};

const todoPut = async (req = request, res = response, next) => {
  try {
    const {
      toDo: instance,
      params: { id }
    } = req;
    const { name, description, date, author } = req.body;
    const updated = await updateToDo(
      { name, description, date, author },
      id,
      instance
    );
    res.json({ toDo: updated });
  } catch (error) {
    next(error);
  }
};

const todoDelete = async (req = request, res = response, next) => {
  try {
    const {
      toDo,
      params: { id }
    } = req;
    const deleted = await deleteTodo(id, toDo);
    res.json({ toDo: deleted });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  todoGetById,
  todoGet,
  todoPost,
  todoPut,
  todoDelete
};
