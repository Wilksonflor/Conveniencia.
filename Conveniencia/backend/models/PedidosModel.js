const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema({
  produto: {
    type: String,
    require: true,
  },
  dataPedido: {
    type: Date,
    default: Date.now,
  },
  nomeCliente: {
    type: String,
    require: true,
  },
  numeroPedido: {
    type: Number,
    require: true,
  },
  valorPedido: {
    type: Number,
    require: true,
  },
  quantidade: {
    type: Number,
    require: true,
  },

  // Outros campos específicos do pedido, se houver
});

const Pedido = mongoose.model("Pedido", pedidoSchema);

module.exports = Pedido;
