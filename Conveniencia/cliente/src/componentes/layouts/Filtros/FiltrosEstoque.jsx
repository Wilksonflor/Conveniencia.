import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
const { Search } = Input;

const FiltrosEstoque = ({ onSearch }) => {
  const [buscar, setBuscar] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/produtos/search/${buscar}`
      );
      console.log("response:", response);
      if (response.status === 200) {
        console.log(`Produtos localizados:`, response.data);
        onSearch(response.data.produtos);
      } else {
        console.log("Erro ao buscar produtos: status de resposta inválido");
      }
    } catch (error) {
      console.log("Erro ao buscar produtos:", error.message);
    }
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
