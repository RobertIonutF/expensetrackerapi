const Transaction = require('../model/Transaction');

const createTransaction = async (req, res) => {
    console.log(`Request POST - /transactions FOR USER ${req.user._id}`);
    const { description, amount, category } = req.body;
    const { _id } = req.user;

    if (!description || !amount || !category) {
        return res.status(400).send('Description, amount, and category required');
    }

    try {
        const transaction = await Transaction.create({
            user: _id,
            description,
            amount,
            category
        });

        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).send('Something went wrong');
    }
}

const getTransactions = async (req, res) => {
    const { _id } = req.user;

    try {
        const transactions = await Transaction.find({ user: _id });
        res.json(transactions);
    } catch (err) {
        res.status(500).send('Something went wrong');
    }
}

const getTransaction = async (req, res) => {
    const { id } = req.params;
    const { _id } = req.user;

    try {
        const transaction = await Transaction.findOne({ _id: id, user: _id });
        if (!transaction) return res.status(404).send('Transaction not found');

        res.json(transaction);
    } catch (err) {
        res.status(500).send('Something went wrong');
    }
}

const updateTransaction = async (req, res) => {
    const { id } = req.params;
    const { description, amount, category } = req.body;
    const { _id } = req.user;

    if (!description || !amount || !category) {
        return res.status(400).send('Description, amount, and category required');
    }

    try {
        const transaction = await Transaction.findOneAndUpdate({ _id: id, user: _id }, {
            description,
            amount,
            category
        }, { new: true });

        if (!transaction) return res.status(404).send('Transaction not found');

        res.json(transaction);
    } catch (err) {
        res.status(500).send('Something went wrong');
    }
}

const deleteTransaction = async (req, res) => {
    const { id } = req.params;
    const { _id } = req.user;

    try {
        const transaction = await Transaction.findOneAndDelete({ _id: id, user: _id });
        if (!transaction) return res.status(404).send('Transaction not found');

        res.json(transaction);
    } catch (err) {
        res.status(500).send('Something went wrong');
    }
}

module.exports = {
    createTransaction,
    getTransactions,
    getTransaction,
    updateTransaction,
    deleteTransaction
}