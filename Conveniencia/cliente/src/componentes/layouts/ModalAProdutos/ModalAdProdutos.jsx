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

const ModalAdProdutos = ({ visible, onCancel }) => {
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    setLoading(true);
    // Logica para adicionar o produto tem que ser uma função assincrona
    setTimeout(() => {
      setLoading(false);
      message.success("Produto inserido");
      onCancel();
    }, 2000);
  };

  return (
    <Modal
      title="Adicionar Produto"
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
              <Input placeholder="Digite o produto..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Preço (R$)">
              <Input placeholder="Digite o preço" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Quantidade">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Data de entrada">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalAdProdutos;
