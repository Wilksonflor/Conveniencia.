import  { useState } from "react";
import { Modal, Button } from "antd";

const ModalAdProdutos = ({ visible, onCancel }) => {
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setLoading(true);
    // Aqui você pode fazer a lógica para adicionar o produto
    setTimeout(() => {
      setLoading(false);
      onCancel(); // Fechar o modal após adicionar o produto
    }, 2000); // Simulando uma operação assíncrona
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
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          Adicionar
        </Button>,
      ]}
    >
      {/* Aqui você pode adicionar os campos para adicionar o produto */}
      <p>Campos do formulário para adicionar o produto.</p>
    </Modal>
  );
};

export default ModalAdProdutos;
