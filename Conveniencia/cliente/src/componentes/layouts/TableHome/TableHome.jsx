import { Table, Spin } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

export const TableHome = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/pedidos");
        console.log("Pedidos: ", response.data);
        setPedidos(response.data);
      } catch (error) {
        console.log("erro ao realizar os pedidos", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPedidos();
  }, []);

  const columns = [
    {
      title: "Nome do Cliente",
      dataIndex: "nomeCliente",
      key: "nomeCliente",
    },
    {
      title: "Nº do Pedido",
      dataIndex: "numeroPedido",
      key: "numeroPedido",
    },
    {
      title: "Valor do Pedido",
      dataIndex: "valorPedido",
      key: "valorPedido",
      render: (text) => (
        <span>R$ {parseFloat(text).toFixed(2).replace(".", ",")}</span>
      ),
    },
    {
      title: "Itens do Pedido",
      dataIndex: "produto",
      key: "produto",
      render: (produto, pedido) => {
        const itemPedido = `- ${produto} - ${pedido.quantidade} Unidades`;
        return itemPedido;
      },
    },
    {
      title: "Data do pedido",
      dataIndex: "dataPedido",
      key: "dataPedido",
      render: (data, index) => (
        <span key={index}>{format(new Date(data), "dd/MM/yyyy HH:mm:ss")}</span>
      ),
    },
  ];

  return (
    <>
      <Spin spinning={loading}>
        <Table dataSource={pedidos} columns={columns}></Table>
      </Spin>
    </>
  );
};
