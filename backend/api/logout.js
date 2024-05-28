// logout.js

const express = require('express');
const router = express.Router();

router.post('/api/logout', (req, res) => {
    console.log('Session ID before logout:', req.sessionID);
    req.session.destroy((err) => {
        if (err) {
            res.status(500).json({ error: 'Logout failed' });
        } else {
            res.json({ message: 'Logout successful', redirectUrl: '/login' });
        }
    });
});

module.exports = router;
