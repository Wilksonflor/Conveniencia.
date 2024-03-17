import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
const { Search } = Input;

const FiltrosEstoque = ({ onSearch }) => {
  const [buscar, setBuscar] = useState("");

  // Função para lidar com a pesquisa
  const handleSearch = (value) => {
    // Colocar função para buscar o produto
    fetch(`https://dummyjson.com/products/search?q=${value}`)
      .then((res) => res.json())
      .then((data) => {
        // Aqui eu coloco o que eu desejo fazer com a informação da API
        console.log("Produtos encontrados:", data);
        onSearch(data.products);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });
  };

  return (
    <div>
      <Search
        placeholder="Pesquisar produto"
        style={{ width: 400 }}
        value={buscar}
        onSearch={handleSearch}
        onChange={(e) => setBuscar(e.target.value)}
        enterButton={<SearchOutlined />}
      />
    </div>
  );
};

export default FiltrosEstoque;
