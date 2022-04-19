const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validarCampos } = require("./../middelwares");
const {
  todoGet,
  todoPut,
  todoPost,
  todoDelete
} = require("../controllers/todo");

router.get("/", todoGet);

router.put(
  "/:id",
  [check("id", "No es un Id válido").isInt(), validarCampos],
  todoPut
);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("description", "La descripción es obligatoria").not().isEmpty(),
    check("date", "La fecha es obligatoria").not().isEmpty(),
    check("date", "La fecha debe ser válida").isISO8601().toDate(),
    check("author", "El autor es obligatorio").not().isEmpty(),
    check("author", "El autor debe ser un correo").isEmail(),
    validarCampos
  ],
  todoPost
);

router.delete(
  "/:id",
  [check("id", "No es un Id válido").isInt(), validarCampos],
  todoDelete
);

module.exports = router;
