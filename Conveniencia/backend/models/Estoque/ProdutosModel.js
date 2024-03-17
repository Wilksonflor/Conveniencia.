const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema({
  nomeProduto: {
    type: String,
    required: true,
  },
  codigoProduto: {
    type: Number,
    unique: true,
    default: () => Math.floor(1000 + Math.random() * 1999),
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
  valorTotal: {
    type: Number,
    required: true,
  },
  // Outros campos específicos do produto
});

const Produto = mongoose.model("Produto", produtoSchema);

module.exports = Produto;
