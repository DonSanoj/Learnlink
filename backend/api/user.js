const express = require('express');
const { pgClient } = require('../config');

const userIdFetch = express.Router();

userIdFetch.get('/user', async (req, res) => {
    const userId = req.query.userId;

    try {
        const query = 'SELECT user_id FROM users WHERE user_id = $1';
        const result = await pgClient.query(query, [userId]);

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = userIdFetch;
