const { pgClient } = require('./config');
const bcrypt = require('bcryptjs');

async function validateUser(username, password) {
    try {
        const result = await pgClient.query('SELECT password FROM users WHERE user_name = $1', [username]);
        if (result.rows.length > 0) {
            const hashedPassword = result.rows[0].password;
            const isValid = await bcrypt.compare(password, hashedPassword);
            return isValid;
        }
        return false;
    } catch (error) {
        console.error('Error validating user:', error);
        throw new Error('User validation failed');
    }
}

async function validateAdmin(username, password) {
    try {
        const result = await pgClient.query('SELECT password FROM admins WHERE admin_name = $1', [username]);
        if (result.rows.length > 0) {
            const hashedPassword = result.rows[0].password;
            const isValid = await bcrypt.compare(password, hashedPassword);
            return isValid;
        }
        return false;
    } catch (error) {
        console.error('Error validating admin:', error);
        throw new Error('Admin validation failed');
    }
}

module.exports = { validateUser, validateAdmin };
