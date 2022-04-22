const { request, response } = require("express");
const db = require("../models/db");

const todoGetById = async (req = request, res = response, next) => {
  try {
    const { toDo } = req;
    res.json({ toDo });
  } catch (error) {
    next(error);
  }
};

const todoGet = async (req = request, res = response, next) => {
  try {
    const [toDos, total] = await Promise.all([
      db.ToDo.findAll(),
      db.ToDo.count()
    ]);
    return res.json({ total, toDos });
  } catch (error) {
    next(error);
  }
};

const todoPost = async (req = request, res = response, next) => {
  try {
    const { name, description, date, author } = req.body;
    const toDo = await db.ToDo.create({ name, description, date, author });
    res.status(201).json({ toDo });
  } catch (error) {
    next(error);
  }
};

const todoPut = async (req = request, res = response, next) => {
  try {
    const { toDo } = req;
    const { name, description, date, author } = req.body;
    const updated = await toDo.update(
      { name, description, date, author },
      {
        returning: true,
        plain: true
      }
    );
    res.json({ toDo: updated });
  } catch (error) {
    next(error);
  }
};

const todoDelete = async (req = request, res = response, next) => {
  try {
    const { toDo } = req;
    const deleted = await toDo.destroy({ force: true });
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
