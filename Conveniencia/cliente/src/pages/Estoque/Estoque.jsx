import { Table, Button, Space, Menu } from "antd";
import { useState, useEffect } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import FiltrosEstoque from "../../componentes/layouts/SearchEstoque/FiltrosEstoque";
import ModalAdProdutos from "../../componentes/layouts/ModalAProdutos/ModalAdProdutos";

import styled from "./Estoque.module.css";
import axios from "axios";

export const Estoque = () => {
  const [dataSource, setDataSource] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/produtos");
        setDataSource(response.data.produto);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProdutos();
  }, []);

  const handleSearch = async (produtos) => {
    setSearchedProducts(produtos);
  };

  const handleEdit = async (produtoId) => {
    try {
      const response = await axios.get(`http://localhost:5000/${produtoId}`);
      console.log(response.data);

      console.log("Editando produto:", record);
    } catch (error) {
      console.log("erro ao editar produto", error);
    }
  };

  const handleDelete = (record) => {
    console.log("Excluindo produto:", record);
  };

  const handleModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const columns = [
    {
      title: "Código",
      dataIndex: "codigoProduto",
      key: "codigoProduto",
    },
    {
      title: "Produto",
      dataIndex: "nomeProduto",
      key: "nomeProduto",
    },
    {
      title: "Em estoque",
      dataIndex: "quantidadeEstoque",
      key: "quantidadeEstoque",
    },
    {
      title: "Preço unitário",
      dataIndex: "precoUnitario",
      key: "precoUnitario",
      render: (text) => (
        <span>R$ {parseFloat(text).toFixed(2).replace(".", ",")}</span>
      ),
    },
    {
      title: "Valor total",
      dataIndex: "valorTotal",
      key: "valorTotal",
      render: (text) => (
        <span>R$ {parseFloat(text).toFixed(2).replace(".", ",")}</span>
      ),
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.codigoProduto)}
          ></Button>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          ></Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h2 className={styled.h2}>Produtos em estoque</h2>
      <div className={styled.containerSearch}>
        <FiltrosEstoque onSearch={handleSearch} />
        <Button type="primary" onClick={handleModal}>
          <PlusOutlined />
          Adicionar Produto
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={
          searchedProducts && searchedProducts.length > 0
            ? searchedProducts.map((record, index) => ({
                ...record,
                key: `${index}`,
              }))
            : dataSource.map((record, index) => ({
                ...record,
                key: `${index}`,
              }))
        }
        size="small"
      />
      <ModalAdProdutos visible={modalVisible} onCancel={handleCloseModal} />
    </>
  );
};
