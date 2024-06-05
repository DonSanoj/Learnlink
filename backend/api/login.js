const express = require('express');
const { validateUser, validateAdmin } = require('../auth');
const bcrypt = require('bcrypt');
const { pgClient } = require('../config');
const router = require('./logout');

const loginRouter = express.Router();

loginRouter.post('/login', async (req, res) => {
    const { email, password, isAdmin } = req.body;

    try {
        let isValid;
        if (isAdmin) {
            isValid = await validateAdmin(email, password);
            if (isValid) {
                req.session.user = { email: 'admin' };
                res.json({ message: '', redirectUrl: '/admin' });
            } else {
                res.status(404).json({ error: 'Invalid admin email or password' });
            }
        } else {
            const user = await validateUser(email, password);
            if (user) {
                req.session.user = { email: user.user_email }; // Store user email in session
                res.json({ message: '', user, redirectUrl: '/' }); // Send user data in response
            } else {
                res.status(404).json({ error: 'Invalid email or password' });
            }
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = loginRouter;
