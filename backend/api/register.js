const express = require('express');
const bcrypt = require('bcryptjs');
const { pgClient } = require('../config');

const router = express.Router();

router.post('/api/register', async (req, res) => {
    const { username, birthday, educationLevel, contactNumber, email, password } = req.body;

    if (!username || !birthday || !educationLevel || !contactNumber || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const userCheckQuery = "SELECT * FROM users WHERE user_email = $1";
        const { rows: existingUsers } = await pgClient.query(userCheckQuery, [email]);

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database
        const insertUserData = 'INSERT INTO users (user_name, password, birthday, educationlevel, user_contactnumber, user_email) VALUES ($1, $2, $3, $4, $5, $6)';
        await pgClient.query(insertUserData, [username, hashedPassword, birthday, educationLevel, contactNumber, email]);

        return res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Registration failed. Please try again later.' });
    }
});

module.exports = router;
