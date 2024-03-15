import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Search } = Input;

const FiltrosEstoque = () => {
  // Função para lidar com a pesquisa
  const handleSearch = (value) => {
    // Implemente a lógica de pesquisa conforme necessário
    console.log("Pesquisando por:", value);
  };

  return (
    <div>
      <Search
        placeholder="Pesquisar produto"
        onSearch={handleSearch}
        style={{ width: 400 }}
        enterButton={<SearchOutlined />}
      />
    </div>
  );
};

export default FiltrosEstoque;
