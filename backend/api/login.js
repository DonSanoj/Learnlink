const express = require('express');
const { validateUser, validateAdmin } = require('../auth');
const bcrypt = require('bcrypt');
const { pgClient } = require('../config');

const loginRouter = express.Router();

loginRouter.post('/api/login', async (req, res) => { 
    const { username, password, isAdmin } = req.body;
debugger;
    try {
        let isValid;
        if (isAdmin) {
            isValid = await validateAdmin(username, password);  // Fix: pass the raw password
            if (isValid) {
                req.session.user = { username: 'admin' };
                res.json({ message: '', redirectUrl: '/admin' });
            } else {
                res.status(404).json({ error: 'Invalid admin username or password' });
            }
        } else {
            isValid = await validateUser(username, password);  // Fix: pass the raw password
            if (isValid) {
                req.session.user = { username };
                console.log('Session ID:', req.sessionID);
                res.json({ message: '', redirectUrl: '/' });
            } else {
                res.status(404).json({ error: 'Invalid username or password' });
            }
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = loginRouter;
