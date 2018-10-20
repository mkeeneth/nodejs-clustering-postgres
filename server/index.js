"use strict";

const express = require("express");
const responseTime = require("response-time");
const mountRoutes = require("./routes");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const app = express();
app.use(helmet()); // secure it
app.use(responseTime()); // time it
app.use(bodyParser.urlencoded({ extended: true }));

mountRoutes(app);

// for simple test example
var users = ["John", "Betty", "Hal"];

app.get("/api/users", function(req, res) {
  res.json(users);
});

module.exports = app;
