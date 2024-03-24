import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
const { Search } = Input;

const FiltrosEstoque = ({ onSearch }) => {
  const [buscar, setBuscar] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/produtos/${buscar}`
      );

      if (response.status === 200) {
        onSearch(response.data.produtos);
        setError(null); 
      } else {
        console.log("Erro ao buscar produtos: status de resposta inválido");
        setError("Erro ao buscar produtos: status de resposta inválido");
      }
    } catch (error) {
      console.log("Erro ao buscar produtos:", error.message);
      setError("Produto não localizado");
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
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FiltrosEstoque;
