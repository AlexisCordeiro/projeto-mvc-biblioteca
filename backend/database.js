// database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./biblioteca.db');

db.serialize(() => {
    // Tabela de livros
    db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      isbn TEXT NOT NULL UNIQUE
    )
  `);

    // Tabela de usuários
    db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      userId TEXT NOT NULL UNIQUE
    )
  `);

    // Tabela de empréstimos
    db.run(`
    CREATE TABLE IF NOT EXISTS loans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      book_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      loan_date TEXT NOT NULL,
      return_date TEXT,
      FOREIGN KEY(book_id) REFERENCES books(id),
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);
  
    db.run(`INSERT OR IGNORE INTO users (id, name, userId) VALUES (1, 'Usuário Padrão', 'user1')`);

});

module.exports = db;
