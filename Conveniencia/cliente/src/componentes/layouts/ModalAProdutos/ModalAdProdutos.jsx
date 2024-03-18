import { useState } from "react";
import axios from "axios";
import {
  Modal,
  Button,
  Form,
  Input,
  DatePicker,
  InputNumber,
  message,
  Row,
  Col,
} from "antd";

const ModalAdProdutos = ({ visible, onCancel, fetchProdutos }) => {
  const [loading, setLoading] = useState(false);
  const [produto, setProduto] = useState({
    nomeProduto: "",
    preco: 0,
    quantidade: 0,
    dataEntrada: null,
  });

  const handleChange = (field, value) => {
    setProduto((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleOk = async () => {
    setLoading(true);
    const { nomeProduto, preco, quantidade, dataEntrada, codigoProduto } =
      produto;
    const precoFormatado = preco.replace(",", ".");
    try {
      const response = await axios.post(
        "http://localhost:5000/produtos/novosProdutos",
        {
          nomeProduto,
          precoUnitario: precoFormatado,
          quantidadeEstoque: quantidade,
          dataEntrada,
          codigoProduto,
        }
      );
      console.log("Produto criado com sucesso", response.data);
      message.success("Produto inserido");
      fetchProdutos();
      onCancel();
    } catch (error) {
      console.log("Erro ao criar produto", error);
      message.error("Erro ao criar produto");
    } finally {
      setLoading(false);
    }
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
            <Form.Item label="Produto">
              <Input
                placeholder="Digite o produto..."
                value={produto.nomeProduto}
                onChange={(e) => handleChange("nomeProduto", e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Preço unitário (R$)">
              <Input
                placeholder="Digite o preço"
                value={produto.preco}
                onChange={(e) => handleChange("preco", e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Quantidade">
              <InputNumber
                value={produto.quantidade}
                onChange={(value) => handleChange("quantidade", value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Data de entrada">
              <DatePicker
                style={{ width: "100%" }}
                value={produto.dataEntrada}
                placeholder="Insira a data"
                format={"DD-MM-YYYY"}
                onChange={(value) => handleChange("dataEntrada", value)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalAdProdutos;
