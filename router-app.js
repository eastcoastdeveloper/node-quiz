const express = require("express");
const app = express();
const helmet = require("helmet");
app.use(helmet());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public"));

app.listen(3000);
