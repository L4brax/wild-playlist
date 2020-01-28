const express = require("express");
const bp = require("body-parser");
require("dotenv").config();

//Database connection
const sql = require("./db.js");

const app = express();
const port = 80;

// Setting up bodyparser to parse data from the body request
app.use(bp.json());

// Retreiving routes
var playlists = require("./routes/playlists");

app.use("/api/v1/playlists", playlists);

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
