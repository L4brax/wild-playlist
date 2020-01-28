const express = require("express");
const router = express.Router();
const db = require("./../db");

const getDateString = () => {
  var d = new Date();
  var curr_date = d.getDate();
  var curr_month = d.getMonth() + 1; //Months are zero based
  var curr_year = d.getFullYear();
  return curr_year + "-" + curr_month + "-" + curr_date;
};

// Create new playlist
router.put("/", function(req, res) {
  if (req.body.name && req.body.style) {
    let param = {
      name: req.body.name,
      style: req.body.style,
      created_date: getDateString()
    };
    let sql = "INSERT INTO playlist SET ?";
    db.query(sql, param, err => {
      if (err) {
        res.json({ status: 500, error: "Erreur interne." });
      } else {
        res.json(JSON.stringify({ status: 201, error: null, response: param }));
      }
    });
  } else {
    res.json({
      status: 400,
      error: "Required data missing in the request body."
    });
  }
});

// Get a specified playlist with its id.
router.get("/:id", function(req, res) {
  if (req.params.id) {
    let param = req.params.id;
    let sql = "SELECT * FROM playlist WHERE playlist_id = ?";
    db.query(sql, param, (err, result) => {
      if (err) {
        res.json({ status: 500, error: "Erreur interne." });
      } else {
        if (result.length === 0) {
          res.json({ status: 404, error: null, response: "NOT FOUND" });
        } else {
          res.json({ status: 200, error: null, response: result });
        }
      }
    });
  } else {
    res.json({
      status: 400,
      error: "Required id parameter missing."
    });
  }
});

module.exports = router;
