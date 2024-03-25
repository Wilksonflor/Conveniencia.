import { useEffect, useState } from "react";
import { Row, Col, Menu } from "antd";
import { ShoppingCartOutlined, CheckCircleOutlined } from "@ant-design/icons";
import ModalVeProdutos from "../../componentes/layouts/ModalVeProdutos/ModalVeProdutos";
import { TableHome } from "../../componentes/layouts/TableHome/TableHome";
import axios from "axios";

export const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetchPedidos();
  }, []); //

  const handleModalVender = () => {
    setModalVisible(true);
    console.log("abriu o modal para vender ");
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const fetchPedidos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/pedidos");
      setPedidos(response.data.produto);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
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
