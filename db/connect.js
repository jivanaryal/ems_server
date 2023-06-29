const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "adminJivan",
  database: "ems",
  connectionLimit: 10,
  port: 3309,
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("connected to mysql Database");
});

module.exports = pool.promise();