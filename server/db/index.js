const config = require("../config");
const { Pool } = require("pg");

// const pool = new Pool({
//   user: process.env.dbuser,
//   host: process.env.dbhost,
//   database: process.env.dbname,
//   password: process.env.dbpassword,
//   port: process.env.dbport,
// });

const pool = new Pool({
  ssl: { rejectUnauthorized: false },
  connectionString:
    "postgres://fswsqztzwtxlwf:bb2daf25cc9e3ca0d7e39367f0457274f224e391680704f3c5b09173f5b16102@ec2-34-232-191-133.compute-1.amazonaws.com:5432/de93nratjlk2ca",
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
