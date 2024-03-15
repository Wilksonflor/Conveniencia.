const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema({
  nomeProduto: {
    type: String,
    required: true,
  },
  codigoProduto: {
    type: Number,
    required: true,
  },
  precoUnitario: {
    type: Number,
    required: true,
  },
  quantidadeEstoque: {
    type: Number,
    required: true,
  },
  // Outros campos específicos do produto
});

const Produto = mongoose.model("Produto", produtoSchema);

module.exports = Produto;
