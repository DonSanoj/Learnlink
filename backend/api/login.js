const { pgClient } = require('../config');
const { validateUser, validateAdmin } = require('../auth');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { username, password, isAdmin } = req.body;

    try {
        let isValid;
        if (isAdmin) {
            isValid = await validateAdmin(username, password);
            if (isValid) {
                req.session.user = { username: 'admin' }; // Store user data in the session
                res.json({ message: '', redirectUrl: '/admin' });
            } else {
                res.status(404).json({ error: 'Invalid admin username or password' });
            }
        } else {
            isValid = await validateUser(username, password);
            if (isValid) {
                req.session.user = { username }; // Store user data in the session
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
};
