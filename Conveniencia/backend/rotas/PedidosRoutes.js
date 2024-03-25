const express = require("express");
const router = express.Router();
const pedidosController = require("../controllers/PedidosController");

router.get("/pedidos", pedidosController.listarPedidos);
router.post("/novoPedido", pedidosController.cadastrarPedido);

module.exports = router;
