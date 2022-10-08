const db = require('./db');

module.exports = async (username, hashedPassword) => {
    try { 
        await db.query(`INSERT INTO users (email, password) VALUES ($1, $2) RETURNING user_id, email, active`, [username, hashedPassword])
    } catch (err) {
        throw err;
    }
}