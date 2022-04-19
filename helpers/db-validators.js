const db = require("../models");

// Verificar si la tarea existe
const existeToDo = async (id = "") => {
  const existeToDo = await db.toDo.findByPk(id);
  if (existeToDo) {
    throw new Error(`La tarea ${id}, ya está registrada`);
  }
};

module.exports = {
  existeToDo
};
