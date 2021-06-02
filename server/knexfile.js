// Update with your config settings.
const config = require("./config");

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: config.dbhost,
      user: config.dbuser,
      password: config.dbpassword,
      database: config.dbname,
    }
  },

};
