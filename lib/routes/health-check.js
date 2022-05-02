const { Router } = require("express");
const router = Router();
const { healthCheck } = require("../controllers/health-check");

router.get("/", healthCheck);
module.exports = router;
