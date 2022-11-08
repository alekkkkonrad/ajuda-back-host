const express = require("express")
const router = express()

router.use("/api/users", require("./UserRoutes"))
router.use("/api/pedidos", require("./PedidoRoutes"))

//test route
router.get("/", (req, res) => {
    res.send("API WORKING")
})

module.exports = router