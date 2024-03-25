import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Input, Row, Col, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
const { Option } = Select;

const ModalVeProdutos = ({ visible, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [precoProduto, setPrecoProduto] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [nomeCliente, setNomeCliente] = useState("");
  const [quantidadePedido, setQuantidadePedido] = useState("");
  const [valorPedido, setValorPedido] = useState("");

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/produtos");
        setProdutos(response.data.produto);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProdutos();
  }, []);

  const calcularValorPedido = () => {
    if (precoProduto && !isNaN(quantidadePedido)) {
      const precoNumerico = parseFloat(
        precoProduto.replace("R$", "").replace(",", ".")
      );
      const quantidadeNumerica = parseFloat(quantidadePedido);
      const valorPedidoCalculado = precoNumerico * quantidadeNumerica;
      setValorPedido(valorPedidoCalculado.toFixed(2));
    } else {
      setValorPedido("");
    }
  };

  const gerarNumeroPedido = () => {
    // // Verificar se já existe um contador no localStorage
    // let contadorPedido = localStorage.getItem("contadorPedido");
    // // Se não houver contador, iniciar em 1
    // if (!contadorPedido) {
    //   contadorPedido = 1;
    // } else {
    //   // Incrementar o contador
    //   contadorPedido = parseInt(contadorPedido) + 1;
    // }
    // // Garantir que o contador esteja no formato de 3 dígitos, preenchido com zeros à esquerda
    // const numeroPedido = `pedido - ${contadorPedido
    //   .toString()
    //   .padStart(3, "0")}`;
    // // Salvar o contador atualizado no localStorage
    // localStorage.setItem("contadorPedido", contadorPedido);
    // return numeroPedido;
  };

  const handleChange = (value) => {
    setProdutoSelecionado(value);
    const produto = produtos.find((p) => p.nomeProduto === value);
    if (produto) {
      const precoFormatado = produto.precoUnitario.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      setPrecoProduto(precoFormatado);
    } else {
      setPrecoProduto("");
    }
  };

  const adicionarAoPedido = () => {
    console.log("Adicionar ao pedido clicado");
    const numeroPedido = gerarNumeroPedido();
    console.log(numeroPedido);
    const pedidoInfo = getPedidoInfo(numeroPedido);
    console.log(pedidoInfo);
  };

  const handleOk = async () => {
    setLoading(true);
    // Lógica para fazer o pedido
    setTimeout(() => {
      message.success("Pedido realizado com sucesso");
    }, 200);
  };

  const getPedidoInfo = (numeroPedido) => {
    const dataHoraPedido = new Date().toLocaleString();
    const produtosInfo = `${produtoSelecionado} - (Quantidade: ${quantidadePedido})`;
    const pedidoInfo = `Número do pedido ${numeroPedido}\nNome do cliente: ${nomeCliente}\nData e hora do pedido: ${dataHoraPedido}\nNome dos itens: ${produtosInfo}\nValor total do pedido: R$ ${valorPedido}`;
    return pedidoInfo;
  };

  return (
    <Modal
      title="Fazer pedido"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          Fazer pedido
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Nome do cliente">
              <Input
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Selecione o produto">
              <Select
                value={produtoSelecionado}
                onChange={handleChange}
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {produtos.map((produto, index) => (
                  <Option key={index} value={produto.nomeProduto}>
                    {produto.nomeProduto}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Preço unitário (R$)">
              <Input disabled value={precoProduto} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Digite a quantidade">
              <Input
                value={quantidadePedido}
                onChange={(e) => {
                  setQuantidadePedido(e.target.value);
                  // calcularValorPedido();
                }}
                onFocus={calcularValorPedido}
                onBlur={calcularValorPedido}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Valor do pedido (R$)">
              <Input disabled value={valorPedido} addonBefore="R$" />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item>
              <Button onClick={adicionarAoPedido}>
                <PlusOutlined style={{ color: "green" }} />
                Adicionar ao pedido
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <TextArea
          readOnly
          value={getPedidoInfo(gerarNumeroPedido())}
          style={{ height: "224px" }}
        />
        {/* Coloque o restante do seu formulário aqui */}
      </Form>
    </Modal>
  );
};

export default ModalVeProdutos;
