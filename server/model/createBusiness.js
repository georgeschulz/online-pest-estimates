const db = require('./db');

module.exports = async (name, user_id, phone, hex_primary, hex_secondary) => {
    try {
        const {rows} = await db.query(`INSERT INTO businesses (name, user_id, phone, hex_primary, hex_secondary) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [name, user_id, phone, hex_primary, hex_secondary])
        await db.query(`UPDATE users SET is_setup = true WHERE user_id = $1`, [user_id])
        return rows[0]
    } catch (err) {
        console.log(err)
        throw err;
    }
}