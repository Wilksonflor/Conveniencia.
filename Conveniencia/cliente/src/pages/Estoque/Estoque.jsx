import { Table, Button, Space } from "antd";
import { useState, useEffect } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import FiltrosEstoque from "../../componentes/layouts/Filtros/FiltrosEstoque";
import styled from "./Estoque.module.css";
import axios from "axios";

export const Estoque = () => {
  const [dataSource, setDataSource] = useState([]);

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

  const handleSearch = (produtos) => {
    setDataSource(produtos);
  };

  const columns = [
    {
      title: "Código",
      dataIndex: "codigoProduto",
    },
    {
      title: "Produto",
      dataIndex: "nomeProduto",
    },
    {
      title: "Em estoque",
      dataIndex: "quantidadeEstoque",
    },
    {
      title: "Preço unitário",
      dataIndex: "precoUnitario",
      render: (text) => (
        <span>R$ {parseFloat(text).toFixed(2).replace(".", ",")}</span>
      ),
    },
    {
      title: "Valor total",
      dataIndex: "valorTotal",
      render: (text) => (
        <span>R$ {parseFloat(text).toFixed(2).replace(".", ",")}</span>
      ),
    },
    {
      title: "Ações",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          ></Button>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          ></Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    // Implemente a lógica para editar o produto
    console.log("Editando produto:", record);
  };

  const handleDelete = (record) => {
    // Implemente a lógica para excluir o produto
    console.log("Excluindo produto:", record);
  };

  return (
    <>
      <h2 className={styled.h2}>Produtos em estoque</h2>
      <div className={styled.containerSearch}>
        <FiltrosEstoque onSearch={handleSearch} />
      </div>
      <Table
        columns={columns}
        dataSource={dataSource.map((record, index) => ({
          ...record,
          key: `${index}`,
        }))}
        size="small"
      />
    </>
  );
};
