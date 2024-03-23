import { useState } from "react";
import { Estoque } from "../../pages/Estoque/Estoque";
import { Caixa } from "../../pages/Caixa/Caixa";
import { Fornecedores } from "../../pages/Fornecedores/Fornecedores";
import {
  HomeOutlined,
  StockOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  ShoppingOutlined,
  TeamOutlined,
  UserOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import { Routes, Route, Link } from "react-router-dom";
import ModalAdProdutos from "../layouts/ModalAProdutos/ModalAdProdutos";
import { Home } from "../../pages/Home/Home";
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <h3>Logo</h3>
        </div>

        <Menu
          style={{ height: "100vh", marginTop: "30px" }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to={"/"}>Início</Link>
          </Menu.Item>
          <SubMenu key="2" icon={<StockOutlined />} title="Estoque">
            <Menu.Item key="2-1" icon={<ShoppingOutlined />}>
              <Link to={"/estoque/"}>Itens do Estoque</Link>
            </Menu.Item>
            <Menu.Item key="2-2" icon={<PlusOutlined />} onClick={handleModal}>
              Adicionar Produto
            </Menu.Item>
          </SubMenu>
          <SubMenu key="3" icon={<TeamOutlined />} title="Fornecedores">
            <Menu.Item key="3-1" icon={<UserOutlined />}>
              <Link to={"/fornecedores"}>Todos os fornecedores</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="4" icon={<DollarOutlined />}>
            <Link to={"/caixa"}>Caixa</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: "0" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 60,
              height: 60,
              background: "#fff",
            }}
            className="ButtonMenu"
          />
        </Header>
        <Content style={{ margin: "24px 16px", padding: 24, minHeight: 280 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/estoque" element={<Estoque />} />
            <Route path="/caixa" element={<Caixa />} />
            <Route path="/fornecedores" element={<Fornecedores />} />
          </Routes>
        </Content>
      </Layout>
      {/* Modal para adicionar produto */}
      <ModalAdProdutos visible={modalVisible} onCancel={handleModal} />
    </Layout>
  );
};

export default App;
