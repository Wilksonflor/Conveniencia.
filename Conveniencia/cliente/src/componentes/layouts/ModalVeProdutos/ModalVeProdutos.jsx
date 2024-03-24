import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Input, Row, Col, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
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
    const valorConvertido = Number(quantidadePedido) * Number(precoProduto);
    console.log(`Valor convertido: ${valorConvertido}`);
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

  const handleOk = async () => {
    setLoading(true);
    // Lógica para adicionar o produto
    setTimeout(() => {
      message.success("Pedido realizado com sucesso");
    }, 200);
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
                  calcularValorPedido();
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Valor do pedido (R$)">
              <Input
                disabled
                // value={valorPedido}
                onChange={calcularValorPedido}
              />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item>
              <Button>
                <PlusOutlined style={{ color: "green" }} />
                Adicionar ao pedido
              </Button>
            </Form.Item>
          </Col>
        </Row>
        {/* Coloque o restante do seu formulário aqui */}
      </Form>
    </Modal>
  );
};

export default ModalVeProdutos;
