const config = require("../config");
const { Pool } = require("pg");

let o = {
  user: process.env.dbuser,
  host: process.env.dbhost,
  databse: process.env.dbname,
  password: process.env.dbpassword,
  port: process.env.dbport,
};

if (process.env.production === "yes") {
  o.cert = process.env.ssl;
}

pool = new Pool(o);

module.exports = {
  query: (text, params) => pool.query(text, params),
};
