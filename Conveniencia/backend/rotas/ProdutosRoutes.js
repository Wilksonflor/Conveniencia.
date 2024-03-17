const express = require("express");
const router = express.Router();
const produtosController = require("../controllers/Produtos/ProdutosController");

router.get("/produtos", produtosController.getAllProdutos);
router.post("/produtos/novosProdutos", produtosController.cadastrarProduto);

module.exports = router;
