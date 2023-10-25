const {createTransaction, getTransactions, getTransaction, updateTransaction, deleteTransaction} = require('../controllers/transactionController');
const router = require('express').Router();

router.post('/', createTransaction);
router.get('/', getTransactions);
router.get('/:id', getTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;