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
} from "antd";

const ModalAdProdutos = ({ visible, onCancel }) => {
  const [loading, setLoading] = useState(false);

  const handleOk = async (value) => {
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
      <Form
        // labelCol={{ span: 4 }}
        // wrapperCol={{ span: 14 }}
        style={{ maxWidth: 800 }}
      >
        <Form.Item>
          <Input placeholder="Digite o produto..." />
        </Form.Item>

        <Form.Item label="R$">
          <Input placeholder="Digite o preço" />
        </Form.Item>

        <Form.Item label="Quantidade">
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAdProdutos;
