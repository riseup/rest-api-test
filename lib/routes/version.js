const { Router } = require("express");
const router = Router();
const { getVersion } = require("../controllers/version");

/**
 * @openapi
 * /version:
 *   get:
 *     tags:
 *       - Otros
 *     summary: version
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 */
router.get("/", getVersion);
module.exports = router;
