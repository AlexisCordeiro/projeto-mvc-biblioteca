// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');

router.post('/', BookController.addBook);
router.get('/', BookController.getBooks);
router.delete('/:id', BookController.deleteBook);

module.exports = router;
