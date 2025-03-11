const mysql = require("mysql2");
require('dotenc').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect(err => {
    if (err) {
        console.error('Database Connection error: ', err);
        process.exit(1);
    }
    console.log('Connected to database at port: ', process.env.PORT);
})

module.exports = db;