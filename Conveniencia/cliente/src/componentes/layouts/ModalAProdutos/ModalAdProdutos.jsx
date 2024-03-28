import { useEffect, useState } from "react";
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

const ModalAdProdutos = ({ visible, onCancel, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [editar, setEditar] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
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
      message.success("Produto inserido");
      setProduto({
        nomeProduto: "",
        preco: 0,
        quantidade: 0,
        dataEntrada: null,
      });

      if (onSuccess) {
        onSuccess();
      }
      onCancel();
    } catch (error) {
      console.log("Erro ao criar produto", error);
      message.error("Erro ao criar produto");
    } finally {
      setLoading(false);
    }
  };

  const editarProdutos = async (produtoId) => {
    try{

    }catch(error){
      console.log()
    }
    const response = axios.get(`http://localhost:5000/${produtoId}`);
    const produtoParaEditar = response.data.produto;

    setProduto(produtoParaEditar);
    setEditar(true);
    setModalVisible(true);
  };
  return (
    <Modal
      title="Entrada de estoque"
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
          Salvar
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
