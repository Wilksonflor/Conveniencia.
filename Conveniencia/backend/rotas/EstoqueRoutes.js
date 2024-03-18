const express = require("express");
const router = express.Router();
const EstoqueController = require("../controllers/EstoqueController");

router.put("/produtos/:id", EstoqueController.updateEstoque);

module.exports = router;
