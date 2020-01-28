const mysql = require("mysql");

//local mysql db connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_USER_PW,
  database: "wild-playlist"
});

connection.connect(function(err) {
  if (err) throw err;
  // eslint-disable-next-line no-console
  console.log("Database Connection established.");
});

module.exports = connection;
