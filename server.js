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
  const server = require("./server/index");
  const port = process.env.PORT || 8000;

  server.listen(port, () => {
    console.log(`Worker: ${cluster.worker.id} Listening on port: ${port}`);
  });
}
