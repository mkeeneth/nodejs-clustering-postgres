// Lets cluster!
require("dotenv").config();
var cluster = require("cluster");

// security

// master process
if (cluster.isMaster) {
  // CPUs
  var cpuCount = require("os").cpus().length;

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  // handle crashed/dead worker threads
  cluster.on("exit", function(worker) {
    console.log("Worker id: %d exited", worker.id);
    cluster.fork();
  });

  // worker processes
} else {
  const express = require("express");
  const responseTime = require('response-time')
  const mountRoutes = require("./app/routes");
  const helmet = require("helmet");
  const bodyParser = require("body-parser");
  const app = express();
  app.use(helmet()); // secure it
  app.use(responseTime()); // time it
  const port = 8000;

  app.use(bodyParser.urlencoded({ extended: true }));

  mountRoutes(app);

  app.listen(port, () => {
    console.log(`Worker: ${cluster.worker.id} Listening on port: ${port}`);
  });
}
