// routes/loanRoutes.js
const express = require('express');
const router = express.Router();
const LoanController = require('../controllers/LoanController');

router.post('/loan', LoanController.loanBook);
router.post('/return', LoanController.returnBook);
router.get('/active', LoanController.getActiveLoans);
// Adicione esta rota
router.delete('/all', LoanController.deleteAllLoans);


module.exports = router;
