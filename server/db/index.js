const config = require("../config");
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.dbuser,
  host: process.env.dbhost,
  database: process.env.dbname,
  password: process.env.dbpassword,
  port: process.env.dbport,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
