// const entradaEstoque = require("../models/Estoque/EntradaEstoque");
const Produto = require("../models/Estoque/ProdutosModel");
const controleEstoque = require("../models/Estoque/EstoqueModel");
// const saidaEstoque = require("../models/Estoque/SaidaEstoque");

exports.updateEstoque = async (req, res) => {
  const { id } = req.params;
  const { nomeProduto, quantidadeEstoque, codigoProduto, precoUnitario } =
    req.body;
  console.log("chegou do updateProduto", req.body);
  try {
    const produto = await Produto.findByIdAndUpdate(
      id,
      { nomeProduto, quantidadeEstoque, codigoProduto, precoUnitario },
      { new: true }
    );

    if (!produto) {
      return res.status(400).json({ msg: "Produto não localizado" });
    }
    res.status(200).json({ msg: "Produto atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar produto" });
  }
};
