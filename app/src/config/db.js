const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.DBPORT,
    user: process.env.DBID,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

db.connect();

module.exports = db;