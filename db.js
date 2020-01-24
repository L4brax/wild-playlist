const mysql = require("mysql");

//local mysql db connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "!vlir44amPone",
  database: "wild-playlist",
  insecureAuth: true
});

connection.connect(function(err) {
  if (err) throw err;
  // eslint-disable-next-line no-console
  console.log("Database Connection established.");
});

module.exports = connection;
