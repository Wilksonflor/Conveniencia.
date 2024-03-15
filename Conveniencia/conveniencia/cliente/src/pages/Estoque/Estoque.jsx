import { Table } from "antd";
import { useState, useEffect } from "react";
import FiltrosEstoque from "../../componentes/layouts/Filtros/FiltrosEstoque";
import styled from "./Estoque.module.css";

export const Estoque = () => {
  const [columns, setColumns] = useState([
    {
      title: "Código",
      dataIndex: "id",
    },
    {
      title: "Produto",
      dataIndex: "title",
    },
    {
      title: "Categoria",
      dataIndex: "category",
    },

    {
      title: "Em estoque",
      dataIndex: "stock",
    },

    {
      title: "Preço",
      dataIndex: "price",
      render: (text) => <span>R$ {text},00</span>,
    },
  ]);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((result) => {
        setDataSource(result.products);
      });
  }, []);

  const handleSearch = (produtos) => {
    setDataSource(produtos);
  };
  return (
    <>
      <h2 className={styled.h2}>Produtos em estoque</h2>
      <div className={styled.containerSearch}>
        <FiltrosEstoque onSearch={handleSearch} />
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(record) => record.id}
        size="small"
      />
    </>
  );
};
