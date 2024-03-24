import { Row, Col, Menu } from "antd";
import { ShoppingCartOutlined, CheckCircleOutlined } from "@ant-design/icons";
import ModalVeProdutos from "../../componentes/layouts/ModalVeProdutos/ModalVeProdutos";
import { useState } from "react";

export const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalVender = () => {
    setModalVisible(true);
    console.log("abriu o modal para vender ");
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <section>
      <Row>
        <Col xs={32} sm={4} order={2}>
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
            {/* <Menu.Item>Menu</Menu.Item> */}
            {/* <Menu.Item>Menu</Menu.Item> */}
            {/* <Menu.Item>Menu</Menu.Item> */}
            {/* <Menu.Item>Menu</Menu.Item> */}
            {/* <Menu.Item>Menu</Menu.Item> */}
            {/* <Menu.Item>Menu</Menu.Item> */}
          </Menu>
        </Col>
        <Col xs={24} sm={18} order={1}>
          <div>
            <p>Conteúdo</p>
            <p>Conteúdo</p>
            <p>Conteúdo</p>
            <p>Conteúdo</p>
          </div>
        </Col>
      </Row>
      <ModalVeProdutos visible={modalVisible} onCancel={handleCloseModal} />
    </section>
  );
};
