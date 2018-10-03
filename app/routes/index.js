const notes = require("./note_routes");

module.exports = app => {
  app.use("/notes", notes);
};
