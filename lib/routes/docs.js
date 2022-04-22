const { Router } = require("express");
const router = Router();
const { docsGet } = require("../controllers/docs");

router.get("", docsGet);
module.exports = router;
