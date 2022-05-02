const { Router } = require("express");
const router = Router();
const { healthCheck } = require("../controllers/health-check");

/**
 * @openapi
 * /healthcheck:
 *   get:
 *     tags:
 *       - Otros
 *     summary: healt-check
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 */
router.get("/", healthCheck);
module.exports = router;
