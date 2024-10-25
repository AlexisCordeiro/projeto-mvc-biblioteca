// controllers/UserController.js

const db = require('../database');

exports.addUser = (req, res) => {
  const { name, userId } = req.body;
  const query = `INSERT INTO users (name, userId) VALUES (?, ?)`;
  db.run(query, [name, userId], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json({ id: this.lastID });
    }
  });
};

exports.getUsers = (req, res) => {
  const query = `SELECT * FROM users`;
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
};
