import { useEffect, useState } from "react";
import { Row, Col, Menu } from "antd";
import {
  ShoppingCartOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import ModalVeProdutos from "../../componentes/layouts/ModalVeProdutos/ModalVeProdutos";
import { TableHome } from "../../componentes/layouts/TableHome/TableHome";

export const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [listaPedidos, setListaPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/pedidos");
        setListaPedidos(response.data);
      } catch (error) {
        console.error("Erro ao buscar pedidos", error);
      }
    };
    fetchPedidos();
  }, []);

  const handleModalVender = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // const handlePedidoSuccess = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/pedidos");
  //     setListaPedidos(response.data);
  //     console.log("Lista de pedidos atualizada:", response.data);
  //   } catch (error) {
  //     console.error("Erro ao listar os pedidos", error);
  //   }
  // };

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
          <TableHome pedidos={listaPedidos} />
        </Col>
      </Row>
      <ModalVeProdutos
        visible={modalVisible}
        onCancel={handleCloseModal}
        // onSuccess={handlePedidoSuccess}
      />
    </section>
  );
};
