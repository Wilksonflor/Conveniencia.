// Home.js
import { useState } from "react";
import { Row, Col, Menu } from "antd";
import {
  ShoppingCartOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import ModalVeProdutos from "../../componentes/layouts/ModalVeProdutos/ModalVeProdutos";
import { TableHome } from "../../componentes/layouts/TableHome/TableHome";

export const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalVender = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <section>
      <Row>
        <Col xs={32} sm={3} order={2} style={{ marginLeft: 20 }}>
          <Menu>
            <Menu.Item
              key="venderProduto"
              icon={<ShoppingCartOutlined style={{ color: "green" }} />}
              onClick={handleModalVender}
            >
              Fazer pedido
            </Menu.Item>

            <Menu.Item
              key="entregarPedido"
              icon={<CheckCircleOutlined style={{ color: "blue" }} />}
            >
              Entregar Pedido
            </Menu.Item>
            <Menu.Item
              key="cancelarPedido"
              icon={<CloseCircleOutlined style={{ color: "red" }} />}
            >
              Cancelar Pedido
            </Menu.Item>
          </Menu>
        </Col>
        <Col xs={24} sm={18} order={1}>
          <TableHome />
        </Col>
      </Row>
      <ModalVeProdutos visible={modalVisible} onCancel={handleCloseModal} />
    </section>
  );
};
