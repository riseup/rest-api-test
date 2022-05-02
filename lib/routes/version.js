const { Router } = require("express");
const router = Router();
const { getVersion } = require("../controllers/version");

router.get("/", getVersion);
module.exports = router;
