const Pedido = require("../models/PedidosModel");

exports.cadastrarPedido = async (req, res) => {
  const { produto, dataPedido, quantidade, nomeCliente, valorPedido } =
    req.body;

  if (!produto || !dataPedido || !quantidade || !nomeCliente) {
    return res.status(400).json({ msg: "Dados do pedido incompletos" });
  }
  try {
    const numeroPedido = Math.floor(100 + Math.random() * 99); 
    const novoPedido = await Pedido.create({
      numeroPedido,
      produto,
      dataPedido,
      quantidade,
      nomeCliente,
      valorPedido,
    });

    res
      .status(201)
      .json({ msg: "Pedido feito com sucesso", pedido: novoPedido });
    console.log(`Pedido feito com sucesso ${novoPedido}`);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao realizar o pedido", error });
  }
};
exports.listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.status(200).json(pedidos);
  } catch (error) {
    console.log("error ao listar os pedidos", error);
    res.status(500).json({ msg: "Erro ao listar os pedidos" });
  }
};
