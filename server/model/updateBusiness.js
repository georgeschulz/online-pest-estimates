const db = require('./db');

module.exports = async (name, phone, hexPrimary, hexSecondary, userId) => {
    try {
        const response = await db.query(`UPDATE businesses SET name = $1, phone = $2, hex_primary = $3, hex_secondary = $4 WHERE user_id = $5 RETURNING *`, [name, phone, hexPrimary, hexSecondary, userId]);
        return response.rows[0]
    } catch (err) {
        throw err;
    }
}