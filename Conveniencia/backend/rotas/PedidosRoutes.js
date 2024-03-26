const express = require("express");
const router = express.Router();
const pedidosController = require("../controllers/PedidosController");

router.get("/pedidos", pedidosController.listarPedidos);
router.get("/pedidos/:id", pedidosController.listarPedidoPorId);
router.post("/novoPedido", pedidosController.cadastrarPedido);
module.exports = router;
