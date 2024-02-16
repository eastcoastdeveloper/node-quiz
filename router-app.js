const express = require("express");
const app = express();
const helmet = require("helmet");
app.use(helmet());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public"));

// const router = require("./router");

// app.use("/", router);

app.listen(3000);
