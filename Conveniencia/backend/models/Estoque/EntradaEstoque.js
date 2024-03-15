const mongoose = require("mongoose");

const entradaEstoqueSchema = new mongoose.Schema({
  produto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Produto",
    required: true,
  },
  quantidadeEntrada: {
    type: Number,
    required: true,
  },
  dataEntrada: {
    type: Date,
    required: true,
    default: Date.now,
  },
  // Outros campos específicos da entrada de estoque
});

const EntradaEstoque = mongoose.model("EntradaEstoque", entradaEstoqueSchema);

module.exports = EntradaEstoque;
