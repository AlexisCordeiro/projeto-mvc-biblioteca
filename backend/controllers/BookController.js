// controllers/BookController.js
const db = require('../database');

exports.addBook = (req, res) => {
  const { title, author, isbn } = req.body;
  const query = `INSERT INTO books (title, author, isbn) VALUES (?, ?, ?)`;
  db.run(query, [title, author, isbn], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json({ id: this.lastID });
    }
  });
};

exports.getBooks = (req, res) => {
  const queryParam = req.query.q || '';
  const query = `SELECT * FROM books WHERE title LIKE ? OR author LIKE ?`;
  const params = [`%${queryParam}%`, `%${queryParam}%`];
  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
};

// controllers/BookController.js

exports.deleteBook = (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM books WHERE id = ?`;
  
    db.run(query, [id], function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        // Verifica se alguma linha foi afetada (livro existia)
        if (this.changes > 0) {
          res.json({ message: 'Livro deletado com sucesso' });
        } else {
          res.status(404).json({ error: 'Livro não encontrado' });
        }
      }
    });
  };
  