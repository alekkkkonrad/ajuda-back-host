const express = require("express")
const router = express.Router()

//Controller
const {insertPedido, deletePedido, getAllPedidos, getUserPedidos, getPedidoById, updatePedido, searchPedido, makeContact} = require("../controllers/PedidoController")
//Middlewares
const authGuard = require("../middlewares/authGuard")
const validate = require("../middlewares/handleValidation")
const {pedidoInsertValidation, pedidoUpdateValidation} = require("../middlewares/pedidoValidation") 

//Routes
router.post("/", authGuard, pedidoInsertValidation(), validate, insertPedido)
router.delete("/:id", authGuard, deletePedido)
router.get("/", getAllPedidos)
router.get("/users/:id", authGuard, getUserPedidos)
router.get("/search", searchPedido)
router.get("/:id", authGuard, getPedidoById)
router.put("/:id", authGuard, pedidoUpdateValidation(), updatePedido)
router.post("/contact", makeContact)
module.exports = router