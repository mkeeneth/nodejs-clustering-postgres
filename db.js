const config = {
  user: process.env.PGUSER || "nodejs", // name of the user account
  password: process.env.PGPASS || "password",
  database: process.env.PGDATABASE || "nodejs", // name of the database
  host: process.env.PGHOST || "127.0.0.1",
  max: process.env.PGMAXPOOL || 900, // max number of clients in the pool
  idleTimeoutMillis: 5000
};

const { Pool } = require("pg");

const pool = new Pool(config);

pool.on("error", err => {
  console.error("An idle client has experienced an error", err.stack);
});

module.exports = {
  // with query logging
  loggedQuery: async (text, params) => {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("executed query", { text, duration, rows: res.rowCount });
    return res;
  },
  // without query logging
  query: (text, params) => pool.query(text, params)
};
