import { useState } from "react";
import { Modal, Button } from "antd";

const ModalAdProdutos = ({ visible, onCancel }) => {
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setLoading(true);
    // Logica para adicionar o produto tem que ser uma função assincrona
    setTimeout(() => {
      setLoading(false);
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
      {/* Aqui eu vou colocar os inputs para dar entrada nos produtos */}
      <p>Campos do formulário para adicionar o produto.</p>
    </Modal>
  );
};

export default ModalAdProdutos;
