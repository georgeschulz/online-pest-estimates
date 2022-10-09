const db = require('./db')

module.exports = async (email, password, userId) => {
    try {
        await db.query(`UPDATE users SET email = $1, password = $2 WHERE user_id = $3`, [email, password, userId]);
    } catch (err) {
        throw err;
    }
}