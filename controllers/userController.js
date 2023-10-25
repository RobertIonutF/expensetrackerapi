const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/User');

const register = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Username and password required');
    }

    if (password.length < 8) {
        return res.status(400).send('Password must be at least 8 characters');
    }

    try {
        const user = await User.create({
            username,
            password
        });

        await user.save();

        res.status(201).send('User created');
    } catch (err) {
        res.status(500).send('Something went wrong');
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password required');
    }

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('User not found');

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Invalid password');

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        return res.json({
            message: 'Logged in',
            token
        });
    } catch (err) {
        res.status(500).send('Something went wrong');
    }
}

module.exports = {
    register,
    login
}