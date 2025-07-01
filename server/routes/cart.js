const router = require("express").Router()
const { sync,getCartById } = require("../controllers/cart")
const auth = require("../middlewares/auth")

router.get("/", auth, getCartById)
router.post("/sync", auth, sync)

module.exports = router