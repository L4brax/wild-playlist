const express = require("express");
const router = express.Router();
const db = require("./../db");

const getDateString = require("./../utils");

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
        res.json({ status: 201, error: null, response: param });
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

// Create new playlist
router.put("/:id/tracks", function(req, res) {
  if (req.body.name && req.body.author) {
    let param = {
      name: req.body.name,
      author: req.body.author,
      added_date: getDateString()
    };
    let sql1 = "INSERT INTO track SET ?";
    let sql2 = "INSERT INTO playlist_track SET ?";
    db.query(sql1, param, (err1, result1) => {
      if (err1) {
        res.json({ status: 500, error: "Erreur interne." });
      } else {
        db.query(
          sql2,
          { playlist_id: req.params.id, track_id: result1.insertId },
          err2 => {
            if (err2) {
              res.json({ status: 500, error: "Erreur interne." });
            } else {
              res.json({ status: 201, error: null, response: param });
            }
          }
        );
      }
    });
  } else {
    res.json({
      status: 400,
      error: "Required data missing in the request body."
    });
  }
});

// Get tracks from a playlist
router.get("/:id/tracks", function(req, res) {
  if (req.params.id) {
    let param = req.params.id;
    let sql =
      "SELECT a.name, a.author, a.added_date FROM track a LEFT JOIN playlist_track b ON a.track_id=b.track_id WHERE b.playlist_id = ?";
    db.query(sql, param, (err, result) => {
      if (err) {
        res.json({ status: 500, error: "Erreur interne." });
      } else {
        res.json({ status: 200, error: null, response: result });
      }
    });
  } else {
    res.json({
      status: 400,
      error: "Required data missing in the request body."
    });
  }
});

// Delete a playlist
router.delete("/:id", function(req, res) {
  if (req.params.id) {
    let param = req.params.id;
    let sql1 = "DELETE FROM playlist WHERE playlist_id = ?";
    let sql2 = "DELETE FROM playlist_track WHERE playlist_id = ?";
    db.query(sql1, param, err1 => {
      if (err1) {
        res.json({ status: 500, error: "Erreur interne." });
      } else {
        db.query(sql2, param, err2 => {
          if (err2) {
            res.json({ status: 500, error: "Erreur interne." });
          } else {
            res.json({ status: 200, error: null });
          }
        });
      }
    });
  } else {
    res.json({
      status: 400,
      error: "Required data missing in the request body."
    });
  }
});

module.exports = router;
