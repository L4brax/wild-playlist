const express = require("express");
const bp = require("body-parser");
require("dotenv").config();

const app = express();
const port = 80;

// Setting up bodyparser to parse data from the body request
app.use(bp.json());

// Retreiving routes
var playlists = require("./routes/playlists");

app.use("/api/v1/playlists", playlists);

app.listen(port, function() {
  // eslint-disable-next-line no-console
  console.log("Wild playlists server is running !");
});
