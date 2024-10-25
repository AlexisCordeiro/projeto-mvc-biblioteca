// controllers/LoanController.js
const db = require('../database');

exports.loanBook = (req, res) => {
  const { book_id } = req.body;
  const user_id = 1;
  const loan_date = new Date().toISOString();

  // Verifica se o livro já está emprestado
  db.get(`SELECT * FROM loans WHERE book_id = ? AND return_date IS NULL`, [book_id], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (row) {
      res.status(400).json({ error: 'Livro já emprestado' });
    } else {
      // Registra o empréstimo
      const query = `INSERT INTO loans (book_id, user_id, loan_date) VALUES (?, ?, ?)`;
      db.run(query, [book_id, user_id, loan_date], function (err) {
        if (err) {
          res.status(400).json({ error: err.message });
        } else {
          res.json({ id: this.lastID });
        }
      });
    }
  });
};

exports.returnBook = (req, res) => {
  const { loan_id } = req.body;
  const returnDate = new Date().toISOString();
  const query = `UPDATE loans SET return_date = ? WHERE id = ?`;
  db.run(query, [returnDate, loan_id], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json({ message: 'Livro devolvido com sucesso' });
    }
  });
};

exports.getActiveLoans = (req, res) => {
  const query = `
    SELECT loans.id, books.title AS book_title, users.name AS user_name, loans.loan_date
    FROM loans
    JOIN books ON loans.book_id = books.id
    JOIN users ON loans.user_id = users.id
    WHERE loans.return_date IS NULL
  `;
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
};

exports.deleteAllLoans = (req, res) => {
    const query = `DELETE FROM loans`;
    db.run(query, [], function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.json({ message: 'Todos os registros de empréstimos foram deletados' });
      }
    });
  };
