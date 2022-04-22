const errors = require("./error-handler");
const validarCampos = require("./validar-campos");
const existeTodo = require("./existe-todo");

module.exports = {
  ...validarCampos,
  ...errors,
  ...existeTodo
};
