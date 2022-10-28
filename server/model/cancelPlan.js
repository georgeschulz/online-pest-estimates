const db = require('./db');

module.exports.cancelPlan = async (userId) => {
    try {
        const today = new Date();
        const todayInDatabaseFormat = today.toISOString().split('T')[0];
        await db.query('UPDATE users SET active = false, cancel_date = $1 WHERE user_id = $2', [todayInDatabaseFormat, userId]);
    } catch (e) {
        console.log(e);
        throw e;
    }
}