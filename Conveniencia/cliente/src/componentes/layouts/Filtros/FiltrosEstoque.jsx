import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
const { Search } = Input;

const FiltrosEstoque = ({ onSearch }) => {
  const [buscar, setBuscar] = useState("");

  // Função para lidar com a pesquisa
  const handleSearch = (value) => {
    // Aqui você pode fazer uma requisição para buscar os produtos com base no valor inserido no campo de pesquisa
    fetch(`https://dummyjson.com/products/search?q=${value}`)
      .then((res) => res.json())
      .then((data) => {
        // Aqui você pode lidar com os dados retornados da API, como definir o estado dos produtos buscados
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
