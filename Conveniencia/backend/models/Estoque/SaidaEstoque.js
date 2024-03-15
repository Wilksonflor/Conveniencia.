const mongoose = require("mongoose");

const saidaEstoqueSchema = new mongoose.Schema({
  produto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Produto",
    required: true,
  },
  quantidadeSaida: {
    type: Number,
    required: true,
  },
  dataSaida: {
    type: Date,
    required: true,
    default: Date.now,
  },
  // Outros campos específicos da saída de estoque
});

const SaidaEstoque = mongoose.model("SaidaEstoque", saidaEstoqueSchema);

module.exports = SaidaEstoque;
