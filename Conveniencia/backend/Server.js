const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser"); // Importe o body-parser
const path = require("path");
const app = express();
const http = require("http");
const base = require("./DataBase/Mongo");

// Importação de rotas
const ProdutosRouter = require("./rotas/ProdutosRoutes");

app.get("/", (req, res) => {
  res.send("Servidor está funcionando!");
});

// Middleware - Configuração do body-parser
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.text({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());

app.use(ProdutosRouter);

const server = http.createServer(app);
const port = 5000;
server.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
