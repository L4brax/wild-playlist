const express = require("express");
require("dotenv").config();

//Database connection
const sql = require("./db.js");

const app = express();
const port = 80;

// Retreiving routes
var playlists = require("./routes/playlists");

app.use("/", playlists);

sql.query("Select * from playlist", function(err, res) {
  if (err) {
    console.log("error: ", err);
  } else {
    console.log(res);
  }
});

app.listen(port, function() {
  // eslint-disable-next-line no-console
  console.log("Wild playlists server is running !");
});
