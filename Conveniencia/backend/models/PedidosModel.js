const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema({
  produto: {
    type: String,
    required: true,
  },
  dataPedido: {
    type: Date,
    default: Date.now,
  },
  nomeCliente: {
    type: String,
    required: true,
  },
  numeroPedido: {
    type: Number,
    required: true,
    unique: true,
  },
  valorPedido: {
    type: Number,
    required: true,
  },
  quantidade: {
    type: Number,
    required: true,
  },
  proximoNumeroPedido: {
    type: Number,
    default: 1,
  },
});

const Pedido = mongoose.model("Pedido", pedidoSchema);

module.exports = Pedido;
