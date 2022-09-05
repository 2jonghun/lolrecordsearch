const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.DBPORT,
    user: process.env.DBID,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    insecureAuth: true,
    supportBigNumbers: true,
    charset: 'utf8mb4',
});

db.connect();

module.exports = db;