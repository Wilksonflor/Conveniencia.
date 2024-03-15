const mongoose = require("mongoose");

mongoose
  .connect(`mongodb://localhost:27017/conveniencia`)
  .then(() => {
    console.log("Conectado ao MongoDB");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao servidor", error);
  });
