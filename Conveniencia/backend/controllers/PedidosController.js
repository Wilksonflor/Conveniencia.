const Pedido = require("../models/PedidosModel");

exports.cadastrarPedido = async (req, res) => {
  const { produto, dataPedido, quantidade, nomeCliente, valorPedido } =
    req.body;

  console.log(JSON.stringify(req.body));
  if (!produto || !dataPedido || !quantidade || !nomeCliente) {
    return res.status(400).json({ msg: "Dados do pedido incompletos" });
  }

  try {
    const numeroPedido = await Pedido.findOneAndUpdate(
      {},
      { $inc: { proximoNumeroPedido: 1 } },
      { new: true, upsert: true, select: "proximoNumeroPedido" }
    );

    const produtoUnico = produto[0];
    const quantidadeUnica = quantidade[0];

    const novoPedido = await Pedido.create({
      numeroPedido: numeroPedido.proximoNumeroPedido,
      produto: produtoUnico,
      dataPedido,
      quantidade: quantidadeUnica,
      nomeCliente,
      valorPedido,
    });

    res
      .status(201)
      .json({ msg: "Pedido feito com sucesso", pedido: novoPedido });
    console.log(`Pedido feito com sucesso ${novoPedido}`);
  } catch (error) {
    console.error("Erro ao cadastrar pedido:", error);
    res.status(500).json({ msg: "Erro ao realizar o pedido", error });
  }
};

exports.listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.status(200).json(pedidos);
  } catch (error) {
    console.error("Erro ao listar os pedidos:", error);
    res.status(500).json({ msg: "Erro ao listar os pedidos" });
  }
};


exports.listarPedidoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const pedido = await Pedido.findById(id);
    if (!pedido) {
      return res.status(404).json({ msg: "Pedido não encontrado" });
    }
    res.status(200).json(pedido);
  } catch (error) {
    console.error("Erro ao obter pedido por ID:", error);
    res.status(500).json({ msg: "Erro ao obter pedido por ID" });
  }
};