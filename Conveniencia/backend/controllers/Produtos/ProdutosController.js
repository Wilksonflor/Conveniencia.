const Produto = require("../../models/Estoque/ProdutosModel");

exports.cadastrarProduto = async (req, res) => {
  const { nomeProduto, quantidadeEstoque, codigoProduto, precoUnitario } =
    req.body;

  try {
    const valorTotal = quantidadeEstoque * precoUnitario;

    const novoProduto = await Produto.create({
      nomeProduto,
      quantidadeEstoque,
      codigoProduto,
      precoUnitario,
      valorTotal,
    });
    res
      .status(201)
      .json({ msg: "Produto criado com sucesso", produto: novoProduto });
    console.log(`produto criado R${novoProduto}`);
  } catch (error) {
    console.log("erro ao cadastrar produto", error);
    res.status(500).json({ msg: "Erro ao criar produto", error });
  }
};

exports.getAllProdutos = async (req, res) => {
  try {
    const produto = await Produto.find();
    res.status(200).json({ msg: "Produto encontrado", produto });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao resgatar produto", error });
  }
};

exports.searchOneProduct = async (req, res) => {
  const { id } = req.params;
  console.log("Chegou para buscar um produto:", id);
  try {
    let produto;

    if (!isNaN(id)) {
      produto = await Produto.findOne({ codigoProduto: id });
    } else {
      produto = await Produto.findOne({ nomeProduto: id });
    }

    if (!produto) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    }

    res.status(200).json({ msg: "Produto encontrado", produto });
  } catch (error) {
    console.log("Erro ao buscar o produto:", error);
    res.status(500).json({ msg: "Erro ao buscar o produto" });
  }
};
