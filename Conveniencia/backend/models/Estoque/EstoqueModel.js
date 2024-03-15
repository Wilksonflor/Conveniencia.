const mongoose = require("mongoose");

const entradaEstoqueSchema = new mongoose.Schema({
  produto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Produto",
  },
  quantidadeEntrada: {
    type: Number,
    required: true,
  },
  quantidadeSaida: {
    type: Number,
    required: true,
  },
  dataEntrada: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dataSaida: {
    type: Date,
    required: true,
    default: Date.now,
  },
  // Outros campos específicos da entrada de estoque
});

const EntradaEstoque = mongoose.model("EntradaEstoque", entradaEstoqueSchema);

module.exports = EntradaEstoque;
