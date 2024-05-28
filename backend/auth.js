const { pgClient } = require('./config');

async function validateUser(username, password) {
    try {
        const result = await pgClient.query('SELECT * FROM users WHERE user_name = $1 AND password = $2', [username, password]);
        return result.rows.length > 0;
    } catch (error) {
        console.error('Error validating user:', error);
        throw new Error('User validation failed');
    }
}

async function validateAdmin(username, password) {
    try {
        const result = await pgClient.query('SELECT * FROM admins WHERE admin_name = $1 AND password = $2', [username, password]);
        return result.rows.length > 0;
    } catch (error) {
        console.error('Error validating admin:', error);
        throw new Error('Admin validation failed');
    }
}

module.exports = { validateUser, validateAdmin };
