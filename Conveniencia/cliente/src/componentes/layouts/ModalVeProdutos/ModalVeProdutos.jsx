import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Input, Row, Col, Select } from "antd";

const { Option } = Select;

const ModalVeProdutos = ({ visible, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [precoProduto, setPrecoProduto] = useState("");
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/produtos");
        console.log("produtos do vender", response);
        setProdutos(response.data.produto);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProdutos();
  }, []);

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
  };

  return (
    <Modal
      title="Cadastrar Produto"
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
          Adicionar
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Row gutter={16}>
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
              <Input readOnly value={precoProduto} />
            </Form.Item>
          </Col>
        </Row>
        {/* Coloque o restante do seu formulário aqui */}
      </Form>
    </Modal>
  );
};

export default ModalVeProdutos;
