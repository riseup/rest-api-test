const { request, response } = require("express");
const db = require("../models/db");

const todoGet = async (req = request, res = response) => {
  try {
    const [toDos, total] = await Promise.all([
      db.ToDo.findAll(),
      db.ToDo.count()
    ]);
    // const toDos = await db.ToDo.findAll();
    return res.json({ total, toDos });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const todoPost = async (req = request, res = response) => {
  try {
    const { name, description, date, author } = req.body;
    const toDo = await db.ToDo.create({ name, description, date, author });
    res.json({ toDo });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const todoPut = async (req = request, res = response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, date, author } = req.body;
    const updated = await db.ToDo.update(
      { name, description, date, author },
      {
        where: { id },
        returning: true,
        plain: true
      }
    );
    let toDo = await db.ToDo.findByPk(id);
    res.json({ toDo });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const todoDelete = async (req = request, res = response) => {
  try {
    const id = parseInt(req.params.id);
    let toDo = await db.ToDo.findByPk(id);
    toDo = await toDo.destroy({ force: true });
    res.json({ toDo });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  todoGet,
  todoPost,
  todoPut,
  todoDelete
};
