const { Router } = require("express");
const router = Router();
const {
  todoGet,
  todoPut,
  todoPost,
  todoDelete
} = require("../controllers/todo");

router.get("/", todoGet);

router.put("/:id", todoPut);

router.post("/", todoPost);

router.delete("/:id", todoDelete);

module.exports = router;
