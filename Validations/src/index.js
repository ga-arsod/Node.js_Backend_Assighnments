let express = require("express");

let app = express();

const userController = require("./controllers/user.controller");

app.use(express.json());

app.use("/users", userController);

module.exports = app;