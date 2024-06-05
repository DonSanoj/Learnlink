const { pgClient } = require('./config');
const bcrypt = require('bcryptjs');

async function validateUser(email, password) {
    try {

        const query = 'SELECT user_id, user_email, user_name FROM users WHERE user_email = $1 AND password = $2';
        const values = [email, password];
        const result = await pgClient.query(query, values);

        if (result.rows.length === 0) {
            console.log('User not found or incorrect password');
            return null;
        }

        const user = {
            user_id: result.rows[0].user_id,
            user_email: result.rows[0].user_email,
            user_name: result.rows[0].user_name,
        };

        return user;

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
