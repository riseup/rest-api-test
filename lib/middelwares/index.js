const errors = require("./error-handler");
const validarCampos = require("./validar-campos");

module.exports = {
  ...validarCampos,
  ...errors
};
