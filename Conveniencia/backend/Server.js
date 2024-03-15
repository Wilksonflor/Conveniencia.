const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const http = require("http");


// Middleware
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.text({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());

const server = http.createServer(app);
const port = 5000;
server.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
