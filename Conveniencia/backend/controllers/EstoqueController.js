const mongoose = require("mongoose");
const produto = require("../models/Estoque/ProdutosModel");
const entradaEstoque = require("../models/Estoque/EntradaEstoque");
const controleEstoque = require("../models/Estoque/EstoqueModel");
const saidaEstoque = require("../models/Estoque/SaidaEstoque");

exports.cadastrarProduto = async (req, res) => {
  const { nomeProduto, quantidadeEstoque, codigoProduto, precoUnitario } =
    req.body;

  try {
    const produto = await Produto.create({
      nomeProduto,
      valor,
      quantidade,
      precoUnitario,
      codigoProduto,
      quantidadeEstoque,
    });

  } catch (error) {
    console.log("erro ao cadastrar produto", error);
  }
};
