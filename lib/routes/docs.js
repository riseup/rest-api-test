const { Router } = require("express")
const router = Router()
const { swaggerSpec } = require("../utils/openapi")

router.get("", (req, res = response) => {
  res.setHeader("Content-Type", "application/json")
  res.send(swaggerSpec)
})
module.exports = router
