const express = require("express");

const firstQuery = require("./controllers/first_query.controller");
const secondQuery = require("./controllers/second_query.controller");

const app = express();

app.use(express.json());

app.use("/submission", firstQuery);
app.use("/topper", secondQuery);

module.exports = app;