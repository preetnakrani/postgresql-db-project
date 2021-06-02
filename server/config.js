require('dotenv').config({path: ".././.env"});

module.exports = {
    PORT: process.env.PORT,
    test: process.env.test,
    dbuser: process.env.dbuser,
    dbhost: process.env.dbhost,
    dbname: process.env.dbname,
    dbpassword: process.env.dbpassword,
    dbport: process.env.dbport,
};