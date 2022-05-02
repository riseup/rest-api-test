const CustomError = require("../models/custom-error");
const { ToDo } = require("../models/db");

const todoGetById = async (req, res, next) => {
  try {
    const {
      params: { id }
    } = req;

    const toDo = await ToDo.findByPk(id);

    res.json({ toDo });
  } catch (error) {
    next(error);
  }
};

const todoGet = async (req, res, next) => {
  try {
    const {
      query: { offset = 0, limit = 10 }
    } = req;

    const { count: total, rows: toDos } = await ToDo.findAndCountAll({
      where: {},
      offset,
      limit
    });

    return res.json({ total, toDos });
  } catch (error) {
    next(error);
  }
};

const todoPost = async (req, res, next) => {
  try {
    const {
      body: { name, description, date, author }
    } = req;

    const toDo = await ToDo.create({ name, description, date, author });

    res.status(201).json({ toDo });
  } catch (error) {
    next(error);
  }
};

const todoPut = async (req, res, next) => {
  try {
    const {
      params: { id },
      body: { name, description, date, author }
    } = req;

    const updateResult = await ToDo.update(
      { name, description, date, author },
      { where: { id } }
    );

    if (updateResult[0] === 0) {
      return next(new CustomError("error_update", 400));
    }

    const toDo = await ToDo.findByPk(id);

    res.json({ toDo });
  } catch (error) {
    next(error);
  }
};

const todoDelete = async (req, res, next) => {
  try {
    const {
      params: { id }
    } = req;

    const deleted = await ToDo.destroy({ where: { id } });

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
