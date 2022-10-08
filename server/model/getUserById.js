const db = require('./db');

module.exports = async (userId) => {
    try {
        const { rows } = await db.query(`SELECT email, password, status, user_id FROM users WHERE user_id = $1;`, [userId]);
        return rows[0];
    } catch (err) {
        throw err;
    }
}