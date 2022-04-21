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

/**
 * @openapi
 * /api/todo:
 *   get:
 *     tags:
 *       - ToDo
 *     summary: Obtener ToDos
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 */
router.get("/", todoGet);

/**
 * @openapi
 * /api/todo/{id}:
 *   put:
 *     tags:
 *       - ToDo
 *     summary: Modificar ToDo
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               name: ABC
 *               description: niatsab
 *               date: '2022-04-15T21:29:06.322Z'
 *               author: correo2@dominio.com
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *         required: true
 *         example: '4'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 */
router.put(
  "/:id",
  [check("id", "No es un Id válido").isInt(), validarCampos],
  todoPut
);

/**
 * @openapi
 * /api/todo:
 *   post:
 *     tags:
 *       - ToDo
 *     summary: Crear ToDo
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               name: Sebato
 *               description: Batus
 *               date: '2022-04-21T21:15:58.965Z'
 *               author: correo1@dominio.com
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 */

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

/**
 * @openapi
 * /api/todo/{id}:
 *   delete:
 *     tags:
 *       - ToDo
 *     summary: Eliminar ToDo
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *         required: true
 *         example: '4'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 */
router.delete(
  "/:id",
  [check("id", "No es un Id válido").isInt(), validarCampos],
  todoDelete
);

module.exports = router;
