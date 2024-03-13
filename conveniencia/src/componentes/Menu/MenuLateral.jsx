import React, { useState } from "react";
import { Estoque } from "../../pages/Estoque/Estoque";
import {
  HomeOutlined,
  StockOutlined,
  CreditCardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import { Routes, Route } from "react-router-dom"; // Importando os componentes do React Router
const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <img src="" alt="" />
          {/* <h3>Logo</h3> */}
        </div>

        <Menu
          style={{ height: "100vh", marginTop: "30px" }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Início
          </Menu.Item>
          <Menu.Item key="2" icon={<StockOutlined />}>
            Estoque
          </Menu.Item>
          <Menu.Item key="3" icon={<CreditCardOutlined />}>
            Caixa
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header>
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
          />
        </Header>
        <Content style={{ margin: "24px 16px", padding: 24, minHeight: 280 }}>
          {/* Defina suas rotas aqui */}
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/estoque" element={<Estoque />} />
            {/* Defina outras rotas conforme necessário */}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
