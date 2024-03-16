const mongoose = require("mongoose");

mongoose
  .connect(`mongodb://127.0.0.1:27017/conveniencia`)
  .then(() => {
    console.log("Conectado ao MongoDB");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao servidor", error);
  });

mongoose.connection.on("error", (err) => {
  console.error("Erro de conexão com o MongoDB:", err);
});
