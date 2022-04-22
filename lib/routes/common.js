const { Router } = require("express");
const router = Router();
const { homeGet, notFound } = require("../controllers/common");

router.get("/", homeGet);

router.all("/*", notFound);

module.exports = router;
